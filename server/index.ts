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

// === Smart Image Sniffer & Cyrillic Solver Middleware ===
// Automatically detects physical file content types (e.g. WebP files named as .jpg)
// and handles Cyrillic request paths accurately to ensure no images are broken on Safari/iOS/Chrome.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  let urlPath = req.path;
  try {
    urlPath = decodeURIComponent(req.path);
  } catch (e) {
    // Keep raw path if decoding fails
  }

  // Skip API routes, Vite sources or source tree requests
  if (urlPath.startsWith('/api') || urlPath.startsWith('/@') || urlPath.startsWith('/src')) {
    return next();
  }

  const ext = path.extname(urlPath).toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.avif', '.webp', '.svg'];

  // Check if this request is aiming for a static folder
  const isTargetFolder = urlPath.includes('/properties/') || 
                         urlPath.includes('/portfolio/') || 
                         urlPath.includes('/site/') || 
                         urlPath.includes('/сайт/') ||
                         urlPath.includes('/catalog/') ||
                         urlPath.includes('/site-images/');

  if (imageExtensions.includes(ext) || isTargetFolder) {
    const parts = urlPath.split('/').filter(p => p !== '');
    const publicPath = path.join(process.cwd(), 'public', ...parts);

    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      try {
        // Read file header to determine the actual magic bytes
        const fd = fs.openSync(publicPath, 'r');
        const buf = Buffer.alloc(12);
        fs.readSync(fd, buf, 0, 12, 0);
        fs.closeSync(fd);

        let detectedContentType = '';

        if (buf[0] === 0xff && buf[1] === 0xd8) {
          detectedContentType = 'image/jpeg';
        } else if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
          detectedContentType = 'image/png';
        } else if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') {
          detectedContentType = 'image/webp';
        } else if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && buf[3] === 0x20 && buf.slice(8, 12).toString('ascii') === 'avif') {
          detectedContentType = 'image/avif';
        } else if (buf[0] === 0 && buf[1] === 0 && buf[2] === 0 && (buf[3] === 0x18 || buf[3] === 0x20) && buf.slice(8, 12).toString('ascii') === 'ftyp') {
          detectedContentType = 'image/avif';
        } else if (ext === '.svg') {
          detectedContentType = 'image/svg+xml';
        }

        if (detectedContentType) {
          res.setHeader('Content-Type', detectedContentType);
          res.setHeader('Cache-Control', 'public, max-age=86400');
          return res.sendFile(publicPath);
        }
      } catch (err) {
        console.error(`[sniff-middleware] Error reading file ${publicPath}:`, err);
      }
    }
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
  lines.push(`🔔 Новая заявка!`);
  lines.push(`Имя: ${esc(body.name || '—')}`);
  lines.push(`Телефон: ${esc(body.phone || '—')}`);
  lines.push(`Email: ${esc(body.email || '—')}`);

  if (body.area)    lines.push(`Площадь: ${esc(body.area)} м²`);
  if (body.budget)  lines.push(`Бюджет: ${esc(body.budget)}`);
  if (body.comment) {
    lines.push(`Сообщение: ${esc(body.comment)}`);
  }
  if (body.url) {
    lines.push(`Страница: ${esc(body.url)}`);
  }
  if (body.utm && Object.keys(body.utm).length) {
    lines.push(`UTM: ${esc(JSON.stringify(body.utm))}`);
  }

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

// =================================================================
// Image proxy: /catalog/{id}.jpg → api.gk-mechti.ru
// Перенаправляет запросы к фото на сервер старого сайта.
// Если ID не в мапминге — отдаёт 404, чтобы React показал заглушку через onError.
// =================================================================
const CATALOG_IMAGE_HASHES: Record<string, string> = {
  'a-0820': '61371781dd3aba13ffd87ddda7c9e377',
  'a-0817': '80a902b709dfd9c8920763eb046059a3',
  'a-1326': 'cb07d5615ecd6b9cd932c0249170d23a',
  'a-0796': 'cde55e9ae6ea308ded14e008b681b464',
  'a-0933': 'ef3c0d804e1fc0d3f60f9a9090a1241d',
  'a-0919': '05131e7e366e211566d36a4d7859d244',
  'a-0795': '6728f7f72e397076ef2453247130a25d',
  'a-0738': 'd7f90df5bcda29cff5744a1e231cddb9',
  'a-1403': '01137e329dca2874d7f12b5a644f2741',
  'a-0735': '9a9838df9c3afb5707d029a0e150ca78',
  'a-0749': 'aca2c406f76801610559766c99c857ef',
  // Остальные ID — без фото, отдаём 404 → React покажет заглушку
};

// Простой in-memory кэш (раз скачали — отдаём из памяти, не дёргаем апстрим)
const imageCache = new Map<string, { buffer: Buffer; contentType: string; ts: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 часа

app.get('/catalog/:id.jpg', async (req: Request, res: Response) => {
  const id = req.params.id;

  // 1. Сначала проверяем, есть ли физический файл в локальной папке public/catalog/ или dist/catalog/
  const publicPath = path.join(process.cwd(), 'public', 'catalog', `${id}.jpg`);
  const distPath = path.join(process.cwd(), 'dist', 'catalog', `${id}.jpg`);

  if (fs.existsSync(publicPath)) {
    return res.sendFile(publicPath);
  }
  if (fs.existsSync(distPath)) {
    return res.sendFile(distPath);
  }

  // 2. Если локально файла нет, определяем хэш для проксирования
  let hash = CATALOG_IMAGE_HASHES[id];

  // Если сам запрошенный ID уже является хэшем (32 символа, hex-строка)
  if (!hash && id.length === 32 && /^[0-9a-f]+$/i.test(id)) {
    hash = id;
  }

  if (!hash) {
    // Нет фото для этого объекта — отдаём 404, фронтенд покажет градиент-заглушку
    return res.status(404).send('No image for this object');
  }

  // Проверяем кэш
  const cached = imageCache.get(id);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Cache', 'HIT');
    return res.send(cached.buffer);
  }

  // Тянем с апстрима
  try {
    const url = `https://api.gk-mechti.ru/api/image/${hash}?width=800&height=600`;
    const upstream = await fetch(url, {
      headers: {
        // Часть серверов проверяет UA и Referer — притворяемся обычным браузером
        'User-Agent': 'Mozilla/5.0 (compatible; MechtiProxy/1.0)',
        'Referer': 'https://gk-mechti.ru/',
      },
    });

    if (!upstream.ok) {
      console.warn(`[image-proxy] ${id} upstream returned ${upstream.status}`);
      return res.status(502).send('Upstream error');
    }

    const arrayBuffer = await upstream.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = upstream.headers.get('content-type') || 'image/jpeg';

    imageCache.set(id, { buffer, contentType, ts: Date.now() });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('X-Cache', 'MISS');
    return res.send(buffer);
  } catch (err) {
    console.error(`[image-proxy] ${id} fetch error:`, err);
    return res.status(500).send('Proxy fetch failed');
  }
});

// === Static Assets static delivery or Vite middleware ===
if (process.env.NODE_ENV !== 'production') {
  console.log('Using Vite middleware in development mode');
  try {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } catch (err) {
    console.error('Failed to initialize Vite middleware, falling back to static:', err);
    setupStaticServing();
  }
} else {
  setupStaticServing();
}

function setupStaticServing() {
  const possiblePaths = [
    path.resolve(process.cwd(), 'dist'),
    path.resolve(__dirname, '../dist'),
    path.resolve(__dirname, '../../dist'),
  ];

  let STATIC_DIR = possiblePaths[0];
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
      STATIC_DIR = p;
      break;
    }
  }

  console.log(`Serving static from: ${STATIC_DIR}`);

  app.use(express.static(STATIC_DIR, {
    maxAge: '1y',
    index: false,
    etag: true,
  }));

  app.get(/^(?!\/api).*/, (_, res: Response) => {
    const indexPath = path.join(STATIC_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Build files not found. Please run "npm run build" first.');
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Mechti-hero server listening on port ${PORT}`);
});

export default app;
