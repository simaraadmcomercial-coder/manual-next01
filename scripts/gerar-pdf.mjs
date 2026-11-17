// Gera public/Manual-Next01.pdf a partir da página de impressão (#/imprimir).
// Uso: npm install && npx playwright install chromium && npm run pdf
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
const root = new URL('../public/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const srv = createServer(async (req, res) => {
  try { const p = req.url.split('?')[0]; const f = await readFile(join(root, p === '/' ? 'index.html' : p));
    res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' }); res.end(f);
  } catch { res.writeHead(404); res.end(); }
}).listen(5199);
const b = await chromium.launch(); const pg = await b.newPage();
await pg.goto('http://localhost:5199/#/imprimir'); await pg.waitForSelector('.cover');
await pg.pdf({ path: join(root, 'Manual-Next01.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
await b.close(); srv.close(); console.log('PDF gerado em public/Manual-Next01.pdf');
