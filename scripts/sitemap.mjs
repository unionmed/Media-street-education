import fs from 'node:fs';
const base = 'https://unionmed.github.io/Media-street-education/';
const pages = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html').sort();
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(f => `  <url><loc>${base}${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Sitemap includes ${pages.length} pages.`);
