import fs from 'node:fs';
import path from 'node:path';

// An explicit allowlist keeps development files and Git data out of the site.
fs.mkdirSync('_site', { recursive: true });
for (const file of fs.readdirSync('.')) {
  if (/\.(html|css|js)$/.test(file) || ['sitemap.xml', '.nojekyll'].includes(file)) {
    fs.copyFileSync(file, path.join('_site', file));
  }
}
fs.cpSync('assets', '_site/assets', { recursive: true });
console.log('Public website prepared in _site/');
