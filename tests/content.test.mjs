import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { normaliseBasePath, normaliseOrigin, publicPath, site } from '../src/lib/site.ts';
import { aliases, routes } from '../scripts/routes.mjs';
const read = (name) =>
  JSON.parse(fs.readFileSync(new URL(`../src/content/${name}.json`, import.meta.url)));

test('content preserves the complete bilingual library', () => {
  const programmes = read('programmes');
  const guides = read('guides');
  assert.equal(programmes.length, 15);
  assert.equal(guides.length, 8);
  assert.equal(new Set(programmes.map((p) => p.id)).size, 15);
  assert.equal(new Set(guides.map((g) => g.slug)).size, 8);
  assert.ok(new Set(programmes.map((p) => p.platform)).size >= 4);
  for (const p of programmes) {
    assert.ok(['ai', 'marketing', 'data', 'leadership'].includes(p.category));
    assert.equal(new URL(p.url).protocol, 'https:');
    for (const locale of ['en', 'ar']) {
      for (const field of ['summary', 'audience', 'project'])
        assert.ok(p[field][locale]?.length > 20, `${p.id}: ${field}/${locale}`);
      assert.ok(p.topics[locale].length >= 3);
    }
  }
  for (const g of guides) {
    assert.ok(routes.includes('/en' + g.relatedPath + '/'));
    for (const locale of ['en', 'ar']) {
      assert.ok(g.title[locale]);
      assert.ok(g.intro[locale]);
      assert.ok(g.sections.length >= 3);
      for (const section of g.sections) {
        assert.ok(section.heading[locale]);
        assert.ok(section.paragraphs[locale].every((p) => p.length > 40));
      }
    }
  }
});
test('hosting configuration supports domain roots and project paths', () => {
  assert.equal(normaliseBasePath('/'), '');
  assert.equal(normaliseBasePath('/project/'), '/project');
  assert.equal(normaliseBasePath(''), '');
  for (const bad of ['https://host.test', 'project', '/../x', '/x?key=y', '//x'])
    assert.throws(() => normaliseBasePath(bad));
  assert.equal(normaliseOrigin('https://example.org/'), 'https://example.org');
  for (const bad of [
    'https://example.org/path',
    'ftp://example.org',
    'https://user:pass@example.org',
    'https://example.org/?x=1',
  ])
    assert.throws(() => normaliseOrigin(bad));
  assert.equal(publicPath('/images/photo.jpg'), site.basePath + '/images/photo.jpg');
});
test('every legacy destination resolves and clean route identities are unique', () => {
  assert.equal(new Set(routes).size, routes.length);
  for (const destination of Object.values(aliases)) assert.ok(routes.includes(destination));
});
test('source and content do not embed a Pages domain or repository path', () => {
  const walk = (dir) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((entry) =>
        entry.isDirectory() ? walk(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`],
      );
  for (const file of walk('src'))
    assert.ok(
      !/github\.io|Media-street-education/.test(fs.readFileSync(file, 'utf8')),
      `${file} embeds the hosting location`,
    );
});
