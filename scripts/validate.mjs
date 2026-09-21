import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { programmes } from './programmes.mjs';
import { guides } from './guides.mjs';

const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const docs = new Map(pages.map(f => [f, fs.readFileSync(f, 'utf8')]));
const base = 'https://unionmed.github.io/Media-street-education/';
assert.equal(programmes.length, 15, 'Expected 15 editorial programme selections');
assert.equal(new Set(programmes.map(p => p.id)).size, programmes.length, 'Programme IDs must be unique');
assert.ok(new Set(programmes.map(p => p.platform)).size >= 4, 'Catalogue must cover multiple platforms');
for (const prefix of ['', 'arabic-']) {
  assert.equal((docs.get(`${prefix}courses.html`).match(/class="card programme-card"/g) || []).length, programmes.length, 'Catalogue incomplete');
  for (const p of programmes) assert.ok(docs.get(`${prefix}programme-${p.id}.html`)?.includes(p.url), `Missing provider link for ${p.id}`);
  for (const g of guides) assert.ok(docs.has(`${prefix}guide-${g.id}.html`), `Missing guide ${g.id}`);
}
let links = 0;
for (const [file, html] of docs) {
  const check = (condition, message) => assert.ok(condition, `${file}: ${message}`);
  check(html.startsWith('<!doctype html>'), 'missing HTML doctype');
  check(/<html lang="(en|ar)" dir="(ltr|rtl)">/.test(html), 'missing language/direction');
  check((html.match(/<h1\b/g) || []).length === 1, 'must have one h1');
  check((html.match(/<main\b/g) || []).length === 1, 'must have one main');
  check(html.includes('id="main"') && html.includes('class="skip"'), 'missing skip navigation');
  check(/<meta name="description" content="[^"]+"/.test(html), 'missing description');
  check(!html.includes('\uFFFD'), 'invalid UTF-8 replacement character');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  check(ids.length === new Set(ids).size, 'duplicate IDs');
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) check(/\balt="[^"]+"/.test(tag[0]), 'missing image alternative');
  for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) check(/rel="[^"]*noopener/.test(tag[0]), 'unsafe external tab');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    let ref = match[1];
    if (ref.startsWith(base)) ref = ref.slice(base.length) || 'index.html';
    if (/^(https?:|mailto:)/.test(ref)) continue;
    check(!ref.startsWith('/'), 'root-relative path breaks project hosting');
    const [target, fragment] = ref.split('#');
    const local = target || file;
    check(fs.existsSync(local), `missing local file ${ref}`);
    check(path.resolve(local).startsWith(process.cwd() + path.sep), `path outside site: ${ref}`);
    if (fragment) check(docs.get(local)?.includes(`id="${fragment}"`), `missing anchor ${ref}`);
    links++;
  }
  if (file !== '404.html') {
    const ar = file.startsWith('arabic');
    const counterpart = ar ? file === 'arabic.html' ? 'index.html' : file.replace('arabic-', '') : file === 'index.html' ? 'arabic.html' : `arabic-${file}`;
    check(html.includes(`hreflang="${ar ? 'en' : 'ar'}" href="${base}${counterpart}"`), 'missing language alternate');
    check(html.includes(`class="language" href="${counterpart}"`), 'incorrect language switch');
    check(html.includes('class="brand merit-brand"'), 'inconsistent brand');
    check(html.includes('rel="canonical"'), 'missing canonical URL');
    check(fs.readFileSync('sitemap.xml', 'utf8').includes(`${base}${file === 'index.html' ? '' : file}</loc>`), 'page missing from sitemap');
  }
}
console.log(`Validated ${pages.length} pages and ${links} local references, including fragments and language pairs.`);
