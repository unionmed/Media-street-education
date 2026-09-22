import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { absoluteUrl, site } from '../src/lib/site.ts';
import { routes, aliases } from './routes.mjs';

const root = path.resolve('out');
let checked = 0;
for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  assert.ok(fs.existsSync(file), `Missing exported route ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  const locale = route.split('/')[1];
  assert.ok(html.includes(`lang="${locale}"`), `Missing language: ${route}`);
  assert.ok(html.includes(`dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`), `Wrong direction: ${route}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One h1 required: ${route}`);
  assert.ok(
    html.includes(`href="${absoluteUrl(route)}"`),
    `Canonical does not use deployment config: ${route}`,
  );
  assert.ok(
    /hreflang="en"/i.test(html) && /hreflang="ar"/i.test(html),
    `Missing language alternate: ${route}`,
  );
  const documentLinks = html.replace(/<link\b[^>]*\brel="(?:preconnect|dns-prefetch)"[^>]*>/gi, '');
  for (const match of documentLinks.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:)/.test(raw)) continue;
    const url = new URL(raw, absoluteUrl(route));
    if (url.origin !== site.origin) continue;
    if (site.basePath)
      assert.ok(
        url.pathname.startsWith(site.basePath + '/'),
        `Missing base path in ${route}: ${raw}`,
      );
    const relative = decodeURIComponent(url.pathname.slice(site.basePath.length)).replace(
      /^\//,
      '',
    );
    let target = path.resolve(root, relative || 'index.html');
    if (fs.existsSync(target) && fs.statSync(target).isDirectory())
      target = path.join(target, 'index.html');
    assert.ok(
      target.startsWith(root + path.sep) && fs.existsSync(target),
      `Broken local reference in ${route}: ${raw}`,
    );
    if (url.hash && target.endsWith('.html'))
      assert.ok(
        fs.readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `Missing anchor in ${route}: ${raw}`,
      );
    checked++;
  }
}
for (const alias of Object.keys(aliases))
  assert.ok(fs.existsSync(path.join(root, alias)), `Missing legacy entry ${alias}`);
assert.ok(fs.existsSync(path.join(root, '404.html')));
assert.ok(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').includes(absoluteUrl(routes[0])));
console.log(
  `Verified ${routes.length} routes, ${checked} local references and ${Object.keys(aliases).length} legacy entry points (${site.basePath || 'domain root'}).`,
);
