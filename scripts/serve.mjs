import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('_site');
const prefix = '/Media-street-education/';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.xml': 'application/xml' };
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/') { res.writeHead(302, { Location: prefix }); return res.end(); }
  const local = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : '';
  const file = path.resolve(root, local || 'index.html');
  if (!pathname.startsWith(prefix) || !file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(fs.readFileSync(path.join(root, '404.html')));
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log(`Preview: http://localhost:4173${prefix}`));
