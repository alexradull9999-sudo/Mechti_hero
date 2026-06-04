import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50kb' })); // защита от больших payload

// Минимальный CORS на случай тестов с других доменов
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

interface LeadPayload {
  source: string;
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  comment?: string;
  budget?: string;
  url?: string;
  utm?: Record<string, string>;
  _hp?: string; // honeypot
}

// === In-memory rate-limit (простой, без сторонних библиотек) ===
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;           // максимум заявок
const RATE_WINDOW_MS = 60_000;  // в минуту

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// === Health-check для мониторинга ===
app.get('/api/health', (_, res: Response) => {
  res.json({ ok: true, service: 'mechti-lead-api' });
});

// === Основной endpoint ===
app.post('/api/lead', async (req: Request, res: Response) => {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Rate limit по IP
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() 
          || req.socket.remoteAddress 
          || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Слишком много заявок. Попробуйте через минуту.' });
  }

  const body = req.body as LeadPayload;

  // Honeypot — если бот заполнил, тихо возвращаем ok
  if (body._hp) {
    return res.status(200).json({ ok: true });
  }

  if (!body.name && !body.phone && !body.email) {
    return res.status(400).json({ error: 'Укажите имя и телефон или email' });
  }

  // Формирование сообщения в Telegram (HTML)
  const lines: string[] = [];
  lines.push(`<b>🔔 НОВАЯ ЗАЯВКА · ${esc(body.source || 'unknown')}</b>`);
  lines.push('');
  if (body.name)    lines.push(`<b>Имя:</b> ${esc(body.name)}`);
  if (body.phone)   lines.push(`<b>Телефон:</b> ${esc(body.phone)}`);
  if (body.email)   lines.push(`<b>Email:</b> ${esc(body.email)}`);
  if (body.area)    lines.push(`<b>Площадь:</b> ${esc(body.area)} м²`);
  if (body.budget)  lines.push(`<b>Бюджет:</b> ${esc(body.budget)}`);
  if (body.comment) {
    lines.push('');
    lines.push(`<b>Сообщение:</b>`);
    lines.push(esc(body.comment));
  }
  if (body.url) {
    lines.push('');
    lines.push(`<i>Страница: ${esc(body.url)}</i>`);
  }
  if (body.utm && Object.keys(body.utm).length) {
    lines.push(`<i>UTM: ${esc(JSON.stringify(body.utm))}</i>`);
  }
  lines.push('');
  lines.push(`<i>${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} МСК · IP: ${esc(ip)}</i>`);

  const text = lines.join('\n');

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgResponse.json() as { ok: boolean; description?: string };
    if (!tgData.ok) {
      console.error('Telegram API error:', tgData);
      return res.status(502).json({ error: 'Не удалось доставить заявку. Попробуйте позже.' });
    }

    // Логируем успешную заявку (для дебага через journalctl)
    console.log(`[lead] ${body.source} from ${ip} — ok`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Network error:', err);
    return res.status(500).json({ error: 'Сетевая ошибка. Попробуйте позже.' });
  }
});

function esc(s: string): string {
  return String(s || '').replace(/[&<>]/g, c =>
    c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'
  );
}

app.listen(PORT, () => {
  console.log(`Mechti lead-api listening on port ${PORT}`);
});

export default app;
