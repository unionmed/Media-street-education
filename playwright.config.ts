import { defineConfig, devices } from '@playwright/test';

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:4173${basePath}/`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node scripts/preview.mjs',
    url: `http://127.0.0.1:4173${basePath}/en/`,
    reuseExistingServer: !process.env.CI,
  },
});
