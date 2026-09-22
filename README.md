# Merit Way

A bilingual English/Arabic learning and education website for Media Street, built with Next.js App Router, TypeScript, React, Tailwind CSS 4 and pnpm. It exports plain HTML, CSS and JavaScript for GitHub Pages.

## Local development

Use the Node version in `.node-version` and the pnpm version in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `/en/` or `/ar/` on the development server. The root entry and legacy HTML redirects are generated for the production export.

```sh
pnpm check          # lint, types and content/configuration checks
pnpm format:check
pnpm build         # Next.js export plus metadata and compatibility routes
pnpm test:export   # every page, local link, asset and fragment
pnpm preview       # serve the export on http://127.0.0.1:4173
```

`pnpm test:e2e` runs Chromium desktop/mobile interaction, no-JavaScript and automated accessibility checks. Install its browser once with `pnpm exec playwright install chromium`.

## Project structure

| Directory          | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `src/app/[locale]` | Statically generated English and Arabic routes              |
| `src/components`   | Shared page layouts, navigation and catalogue               |
| `src/content`      | Bilingual programme and guide data                          |
| `src/lib`          | Types, locale helpers, hosting configuration and metadata   |
| `public/images`    | Team photography and favicon                                |
| `scripts`          | Static export preparation, validation and preview           |
| `tests`            | Content/configuration and browser regression checks         |
| `docs`             | Migration plan, dependency decisions and verification notes |

The library contains 15 programmes and eight full guides in both languages. Team order, learning, higher education and media services are preserved. Programme cards and article content are server rendered; navigation, catalogue filtering and the interactive orbital hero use client state. Scroll reveals progressively enhance the server-rendered content.

## Hosting configuration

Copy `.env.example` to `.env.local` for local settings. Production builds use:

- `NEXT_PUBLIC_SITE_URL`: origin only, such as `https://example.org`.
- `NEXT_PUBLIC_BASE_PATH`: empty at a domain root, or a path such as `/preview`.
- `CUSTOM_DOMAIN`: optional hostname for generating a `CNAME` file when hosting outside the automated Pages configuration.

Set the same environment variables when building, checking or previewing a subdirectory export. These public values are embedded at build time; never put secrets in them.

No GitHub hostname or repository path is embedded in application code. Internal Next.js links, public images, canonical URLs, language alternates, sitemap, redirects and the 404 page all use deployment configuration.

## GitHub Pages deployment

Set repository **Settings → Pages → Source** to **GitHub Actions**. Every push to `main` runs formatting, linting, TypeScript, content checks, a domain-root export check, the actual Pages export check and Chromium desktop/mobile tests before deployment. Pull requests run the same build checks without deploying.

The workflow obtains the origin and base path directly from `actions/configure-pages`. When ready for a custom domain, configure that domain and DNS in GitHub Pages, then rerun the workflow. Pages supplies the new origin and empty base path; no component or route edits are needed. Keep HTTPS enforcement enabled after GitHub provisions the domain certificate.

The export includes 52 compatibility entry points for previous `.html` addresses and old guide fragments, a bilingual custom 404, `robots.txt`, sitemap and `.nojekyll`. GitHub Pages cannot issue server-side redirects; legacy addresses use static redirect documents with visible fallback links.

## Editing content

Edit `src/content/programmes.json` and `src/content/guides.json`. Keep stable IDs/slugs, provide both translations, and use official provider URLs. Update the content-count assertions if the library intentionally grows. Shared company details live in `src/lib/site.ts`; team biographies and category labels live in `src/lib/content.ts`.

Use the tokens and layout guidance in [DESIGN.md](DESIGN.md). Team photographs are existing supplied assets. Fonts are bundled locally; no external font service, analytics, tracking cookies or contact backend is used. Contact actions open the visitor's email application. Higher education is clearly described as a pathway in development.

See [the migration plan](docs/MIGRATION-PLAN.md) and [dependency decisions](docs/DEPENDENCIES.md).
