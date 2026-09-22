# Dependency baseline

Verified 21 September 2026 against npm registry `/latest` metadata. Exact versions are pinned in the manifest and lockfile. Node 24.21.0 is the current LTS; Node 26.9.0 is the current non-LTS release. We use LTS for deployment.

| Package                               | Latest stable at review |
| ------------------------------------- | ----------------------- |
| next                                  | 16.3.5                  |
| react                                 | 19.3.0                  |
| react-dom                             | 19.3.0                  |
| typescript                            | 7.0.2                   |
| tailwindcss                           | 4.3.3                   |
| @tailwindcss/postcss                  | 4.3.3                   |
| postcss                               | 8.5.28                  |
| pnpm                                  | 12.5.1                  |
| eslint                                | 10.11.0                 |
| eslint-config-next                    | 16.3.5                  |
| @types/node                           | 26.6.2                  |
| @types/react                          | 19.3.0                  |
| @types/react-dom                      | 19.3.0                  |
| lucide-react                          | 1.47.0                  |
| prettier                              | 3.9.8                   |
| prettier-plugin-tailwindcss           | 0.8.1                   |
| @axe-core/playwright                  | 4.13.0                  |
| @playwright/test                      | 1.63.0                  |
| @fontsource-variable/dm-sans          | 5.3.0                   |
| @fontsource-variable/manrope          | 5.3.0                   |
| @fontsource-variable/noto-sans-arabic | 5.3.0                   |
| @fontsource/instrument-serif          | 5.3.0                   |

Only packages needed by the implementation are installed. Node type definitions follow the Node 24 runtime major.

Compatibility review on 22 September: TypeScript 6.0.3 and ESLint 9.39.5 are the newest stable versions supported by the current Next.js lint dependency tree. Its TypeScript parser requires TypeScript below 6.1, and its React/accessibility/import plugins require ESLint below 10. Strict peer dependency checking remains enabled; newer incompatible majors are not forced into the project.

Sources: [npm registry](https://registry.npmjs.org/), [Node releases](https://nodejs.org/en/about/previous-releases), [Next static exports](https://nextjs.org/docs/app/guides/static-exports), [Tailwind Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).
