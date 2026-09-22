import fs from 'node:fs';
const programmes = JSON.parse(
  fs.readFileSync(new URL('../src/content/programmes.json', import.meta.url)),
);
const guides = JSON.parse(fs.readFileSync(new URL('../src/content/guides.json', import.meta.url)));
export const locales = ['en', 'ar'];
export const sections = [
  '',
  'programmes',
  'guides',
  'higher-education',
  'services',
  'about',
  'contact',
  'disclosure',
];
export const routes = locales.flatMap((locale) =>
  [
    ...sections,
    ...programmes.map((p) => `programmes/${p.id}`),
    ...guides.map((g) => `guides/${g.slug}`),
  ].map((path) => `/${locale}/${path ? `${path}/` : ''}`),
);
export const aliases = Object.fromEntries(
  locales.flatMap((locale) => {
    const prefix = locale === 'ar' ? 'arabic-' : '';
    return [
      [locale === 'ar' ? 'arabic.html' : 'index.html', `/${locale}/`],
      ...[
        ['courses', 'programmes'],
        ['guides', 'guides'],
        ['postgraduate', 'higher-education'],
        ['services', 'services'],
        ['legal', 'disclosure'],
      ].map(([old, next]) => [`${prefix}${old}.html`, `/${locale}/${next}/`]),
      ...programmes.map((p) => [
        `${prefix}programme-${p.id}.html`,
        `/${locale}/programmes/${p.id}/`,
      ]),
      ...guides
        .filter((g) => !['certificate', 'platforms', 'route'].includes(g.slug))
        .map((g) => [`${prefix}guide-${g.slug}.html`, `/${locale}/guides/${g.slug}/`]),
    ];
  }),
);
