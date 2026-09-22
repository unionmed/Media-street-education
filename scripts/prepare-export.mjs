import fs from 'node:fs';
import path from 'node:path';
import { absoluteUrl, publicPath, site } from '../src/lib/site.ts';
import { aliases, routes } from './routes.mjs';

const out = path.resolve('out');
if (!fs.existsSync(out)) throw new Error('Run next build before preparing the export.');
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const document = (title, body, head = '') =>
  `<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Merit Way</title><meta name="robots" content="noindex">${head}<style>body{margin:0;background:#101c26;color:#f8f9f5;font:18px/1.8 system-ui,sans-serif}main{max-width:700px;margin:15vh auto;padding:32px}h1{font-size:clamp(36px,6vw,64px);line-height:1.15;font-weight:500}a{color:#d3ef92;text-underline-offset:5px;display:inline-block;padding:12px 0;margin-inline-end:24px}a:focus-visible{outline:3px solid #d3ef92;outline-offset:4px}small{letter-spacing:.15em}section{border-top:1px solid #ffffff30;margin-top:32px;padding-top:24px}</style></head><body><main>${body}</main></body></html>`;

for (const [file, target] of Object.entries(aliases)) {
  const destination = publicPath(target);
  const locale = target.startsWith('/ar/') ? 'ar' : 'en';
  const fragments = file.endsWith('guides.html')
    ? Object.fromEntries(
        ['certificate', 'platforms', 'route'].map((id) => [
          `#${id}`,
          publicPath(`/${locale}/guides/${id}/`),
        ]),
      )
    : file === 'index.html' || file === 'arabic.html'
      ? { '#about': publicPath(`/${locale}/about/`), '#contact': publicPath(`/${locale}/contact/`) }
      : {};
  const script = `<script>const routes=${JSON.stringify(fragments)};location.replace(routes[location.hash]||${JSON.stringify(destination)}+location.hash);</script>`;
  fs.writeFileSync(
    path.join(out, file),
    document(
      'Continue to Merit Way',
      `<small>MERIT WAY</small><h1>A clear direction.<br>A meaningful next step.</h1><a href="${escape(destination)}">Continue to the website</a><a href="${escape(publicPath('/ar/'))}" lang="ar" dir="rtl">المتابعة بالعربية</a>${script}`,
      `<link rel="canonical" href="${escape(absoluteUrl(target))}"><meta http-equiv="refresh" content="0;url=${escape(destination)}">`,
    ),
  );
}

fs.writeFileSync(
  path.join(out, '404.html'),
  document(
    'Page not found',
    `<small>MERIT WAY · 404</small><h1>Let’s find your way forward.</h1><p>This address may have changed. Explore the learning library or return to the homepage.</p><a href="${publicPath('/en/')}">Back to home</a><a href="${publicPath('/en/programmes/')}">Explore learning</a><section lang="ar" dir="rtl"><h2>لنعد إلى المسار الصحيح.</h2><p>ربما تغيّر عنوان الصفحة. يمكنك العودة إلى الصفحة الرئيسية.</p><a href="${publicPath('/ar/')}">الرئيسية بالعربية</a></section>`,
  ),
);
const xml = escape;
fs.writeFileSync(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${routes
    .map((route) => {
      const tail = route.replace(/^\/(en|ar)/, '');
      return `<url><loc>${xml(absoluteUrl(route))}</loc>${['en', 'ar'].map((locale) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${xml(absoluteUrl(`/${locale}${tail}`))}"/>`).join('')}</url>`;
    })
    .join('\n')}\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(out, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`,
);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
if (process.env.CUSTOM_DOMAIN) {
  const hostname = process.env.CUSTOM_DOMAIN.trim();
  if (!/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(hostname))
    throw new Error('CUSTOM_DOMAIN must be a hostname only');
  fs.writeFileSync(path.join(out, 'CNAME'), `${hostname}\n`);
}
console.log(
  `Prepared ${routes.length} content routes, ${Object.keys(aliases).length} legacy entry points, sitemap and 404 for ${site.origin}${site.basePath || '/'}`,
);
