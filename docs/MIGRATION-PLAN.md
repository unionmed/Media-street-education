# Next.js migration plan

Prepared before implementation on 21 September 2026.

## Outcome

A maintainable bilingual editorial website, built with Next.js App Router, strict TypeScript, pnpm and Tailwind CSS 4. Preserve the 15 selected programmes, eight guides, team, services and higher education direction. Static export must work on both a project subdirectory and a custom domain without source changes.

## Architecture

- `src/app/[locale]/`: English and Arabic routes, layouts and static parameter generation.
- `src/components/`: shared navigation, footer, cards, editorial layouts and a small client-side catalogue.
- `src/content/`: structured bilingual programme, guide and organisational content; no copied HTML documents as content.
- `src/lib/`: typed content access, routes, locale helpers and metadata.
- `public/images/`: existing team photographs and brand assets.
- `scripts/`: export preparation, route/link validation and a static preview server.
- `tests/`: meaningful configuration/content checks; browser behaviour verified on the exported site.
- `docs/`: architecture, dependency decisions, deployment and design specifications.

Use server components by default. Client JavaScript is limited to mobile navigation and catalogue controls. All content is present in exported HTML. No server API, runtime image optimisation or server redirects are required by the site.

## Hosting strategy

`NEXT_PUBLIC_SITE_URL` defines the origin. `NEXT_PUBLIC_BASE_PATH` defines an optional subdirectory. Next Link handles page prefixes; a shared helper handles public assets. Canonical URLs, alternate languages, sitemap, root entry and legacy redirects use the same configuration. GitHub Actions obtains the URL from the Pages configuration, so it also follows a future custom domain. No repository hostname or project slug appears in application code.

English and Arabic receive equivalent clean routes. The old `.html` addresses receive generated static redirect documents, including the original guide fragments. A root entry chooses English with an explicit Arabic link. The custom 404 provides bilingual recovery links.

## Design direction

An editorial identity for experienced professionals and academics: warm paper, deep ink, muted gold, distinctive serif display type and clear sans-serif body text. Arabic gets its own readable font and calibrated line heights. Use a spacious asymmetrical hero, a prominent team introduction, distinct audience routes and an organised catalogue. Avoid decorative floating cards, generic gradients, unnecessary motion or claims unsupported by existing content.

Create CSS-first Tailwind design tokens and reusable components for buttons, section headings, navigation, catalogue items and article layouts. Use logical CSS properties, consistent focus states, 44px touch targets, accessible labels, reduced-motion support and a mobile menu with keyboard dismissal.

## Delivery sequence

1. Record current stable dependency versions and official documentation.
2. Migrate structured content and local assets; preserve originals through Git history.
3. Establish project configuration, routing, tokens and component architecture.
4. Implement all page types and interactive catalogue.
5. Add metadata, sitemap, legacy links, static 404 and deployment configuration.
6. Validate types, lint, content, export paths and both deployment modes.
7. Inspect desktop/mobile English/Arabic layouts and interactive flows in a browser.
8. Commit, push, verify Actions and the live export.

## Acceptance criteria

- All 15 programmes and eight guides exist in both languages.
- Language switching preserves the equivalent route.
- Search, combined filters, result counts, reset and empty states work.
- No GitHub Pages hostname/project path is embedded in application code or content.
- Root and subdirectory export verification pass.
- No broken local links/assets, duplicate route slugs or missing translations.
- Type checking, linting, formatting and production build pass.
- 320px mobile and desktop layouts have no unintended horizontal overflow.
- Navigation is usable by keyboard; content remains readable without JavaScript.
- Frozen pnpm lockfile and automated Pages deployment are checked in.

## Constraints

GitHub Pages is static hosting: contact uses email, provider enrolment stays with the provider, and higher education remains the stated pathway in development. Domain registration and DNS changes are outside this migration.
