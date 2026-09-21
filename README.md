# Merit Way — a Media Street initiative

Static English/Arabic website for professional learning, higher education enquiries, programme promotion and media production. No framework, third-party scripts, analytics, or build dependencies are required.

**Live website:** https://unionmed.github.io/Media-street-education/

## Included pages

- `index.html` / `arabic.html` — home page and team introduction.
- `courses.html` / `arabic-courses.html` — 15 selections with search and subject/platform/level/goal filters.
- `programme-*.html` / `arabic-programme-*.html` — 15 paired programme detail pages with provider links and original practice suggestions.
- `guides.html` / `arabic-guides.html` — eight original editorial guides, three on the index and five with paired `guide-*.html` detail pages.
- `legal.html` / `arabic-legal.html` — affiliate disclosure, editorial position and privacy information.
- `postgraduate.html` / `arabic-postgraduate.html` — higher education enquiries.
- `services.html` / `arabic-services.html` — programme promotion and media services.
- `404.html` — bilingual recovery links for missing pages, including nested URLs.

The current programme links are direct, non-affiliate provider links. Replace them only after an affiliate/referral agreement is approved and add the partner disclosure beside each changed link.

## Preview and checks

Requires Node.js 22 or newer:

```sh
node scripts/validate.mjs
node scripts/build.mjs
node scripts/serve.mjs
```

Open http://localhost:4173/Media-street-education/. The preview uses the same project path as GitHub Pages. Stop it with Ctrl+C. Validation covers local files, anchors, bilingual links, page metadata, image alternatives and document structure.

## Deployment

GitHub **Settings → Pages → Source** must be **GitHub Actions**. The repository is public for free Pages hosting.

`.github/workflows/pages.yml` validates pull requests and pushes to `main`. Successful pushes build an allowlisted `_site/` artifact and deploy it to the `github-pages` environment. Development files and Git data are excluded from the website artifact. Deployment can also be started from Actions using **Run workflow**.

## Editing

- Edit English and Arabic counterparts together, preserving language switches and RTL direction.
- Use relative local URLs so the site works under the GitHub project path.
- Higher education remains an enquiry pathway in development, not a claim of university partnerships or admissions services.
- Email links open the visitor's email app; the website does not submit or store enquiries.
- Update `sitemap.xml` and canonical/alternate/Open Graph URLs if the hostname or repository path changes.
- Layout is in `styles.css` and `overrides.css`. Images and icons are local; there are no external font dependencies.

Programme content lives in `scripts/programmes.mjs`; the five additional guides live in `scripts/guides.mjs`. After editing them, regenerate the committed HTML and sitemap:

```sh
node scripts/generate-programmes.mjs
node scripts/generate-guides.mjs
node scripts/sitemap.mjs
node scripts/validate.mjs
```

Programme summaries were checked against the linked official provider listings on 21 September 2026. Editorial starting levels, goals and practice exercises are Merit Way suggestions. Prices and time estimates are left to the provider’s current page.
