import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set('trust proxy', 1); // Timeweb is behind reverse-proxy

app.use(express.json({ limit: '50kb' })); // protection from large payloads

// Minimal CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// === In-memory rate-limit (simple, without third-party libraries) ===
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

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

// === Health-check (Timeweb can check that the application is alive) ===
app.get('/api/health', (_, res: Response) => {
  res.json({ ok: true, service: 'mechti-hero', ts: Date.now() });
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
  _hp?: string;
}

// === Endpoint for receiving contact leads ===
app.post('/api/lead', async (req: Request, res: Response) => {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('TELEGRAM env vars not set');
    return res.status(500).json({ error: 'Сервер не настроен' });
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim()
          || req.socket.remoteAddress
          || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Слишком много заявок. Попробуйте через минуту.' });
  }

  const body = req.body as LeadPayload;

  // Honeypot anti-spam check
  if (body._hp) {
    return res.status(200).json({ ok: true });
  }

  if (!body.name && !body.phone && !body.email) {
    return res.status(400).json({ error: 'Укажите имя и телефон или email' });
  }

  const esc = (s: string | undefined): string => {
    return String(s || '').replace(/[&<>]/g, c =>
      c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'
    );
  };

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
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  lines.push(`<i>${now} МСК · IP ${esc(ip)}</i>`);

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

    console.log(`[lead] ${body.source} from ${ip} — ok`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Network error:', err);
    return res.status(500).json({ error: 'Сетевая ошибка. Попробуйте позже.' });
  }
});

// === Static Assets static delivery ===
// Robust resolution of static asset directory across dev and production environments
let STATIC_DIR = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(STATIC_DIR) || !fs.existsSync(path.join(STATIC_DIR, 'index.html'))) {
  STATIC_DIR = path.resolve(__dirname, '../../dist');
}
console.log(`Serving static from: ${STATIC_DIR}`);

app.use(express.static(STATIC_DIR, {
  maxAge: '1y',
  index: false,
  etag: true,
}));

app.get(/^(?!\/api).*/, (_, res: Response) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mechti-hero server listening on port ${PORT}`);
  console.log(`Static dir: ${STATIC_DIR}`);
});

export default app;
