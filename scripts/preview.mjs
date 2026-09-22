import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../src/lib/site.ts';

const root = path.resolve('out');
const port = Number(process.env.PORT || 4173);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400);
      return res.end('Bad request');
    }
    if (site.basePath && pathname === site.basePath) {
      res.writeHead(301, { Location: site.basePath + '/' });
      return res.end();
    }
    const withinBase = !site.basePath || pathname.startsWith(site.basePath + '/');
    const relative = withinBase ? pathname.slice(site.basePath.length).replace(/^\//, '') : '';
    let file = path.resolve(root, relative || 'index.html');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, 'index.html');
    if (
      !withinBase ||
      !file.startsWith(root + path.sep) ||
      !fs.existsSync(file) ||
      !fs.statSync(file).isFile()
    ) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(fs.readFileSync(path.join(root, '404.html')));
    }
    res.writeHead(200, {
      'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Static preview: http://localhost:${port}${site.basePath}/`),
  );
