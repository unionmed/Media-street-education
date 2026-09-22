import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('hero pathways and animation controls work', async ({ page }) => {
  await page.goto('en/');
  const scene = page.locator('.orbit-experience');
  await scene.getByRole('button', { name: 'Go further' }).click();
  await expect(scene.getByRole('button', { name: 'Go further' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(scene.getByRole('link', { name: 'Explore: Go further' })).toHaveAttribute(
    'href',
    /\/en\/higher-education\/$/,
  );
  await expect(scene).toContainText('Make room for a bigger ambition.');
  await scene.getByRole('button', { name: 'Pause animation' }).click();
  await expect(scene).toHaveAttribute('data-paused', 'true');
  await expect(scene.locator('.orbit-sculpture')).toHaveCSS('animation-play-state', 'paused');
  await scene.getByRole('button', { name: 'Resume animation' }).click();
  await expect(scene).toHaveAttribute('data-paused', 'false');
});

test('reduced motion keeps the hero static and content available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('ar/');
  await expect(page.locator('.orbit-sculpture')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.motion-control')).toBeHidden();
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.pathway-panel')).toHaveCount(3);
});

test('programme search, combined filters, empty state and reset', async ({ page }) => {
  await page.goto('en/programmes/');
  const cards = page.locator('.programme-card');
  await expect(cards).toHaveCount(15);
  await page.getByRole('searchbox').fill('Google');
  await expect(cards).not.toHaveCount(15);
  await expect(cards.first()).toContainText('Google');
  await page.getByLabel('Platform', { exact: true }).selectOption('Coursera');
  await expect(cards.first()).toContainText('Google');
  await page.getByRole('searchbox').fill('no-matching-programme-xyz');
  await expect(cards).toHaveCount(0);
  await page.getByRole('button', { name: 'Show all programmes' }).click();
  await expect(cards).toHaveCount(15);
  await expect(page.getByRole('button', { name: 'Reset', exact: true })).toBeDisabled();
});

test('language switching preserves a detail page', async ({ page }) => {
  await page.goto('en/programmes/google-ai/');
  await page.locator('.language-link').click();
  await expect(page).toHaveURL(/\/ar\/programmes\/google-ai\/$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect(page.locator('h1')).toContainText('Google');
  await page.locator('.language-link').click();
  await expect(page).toHaveURL(/\/en\/programmes\/google-ai\/$/);
});

test('mobile navigation responds to keyboard and navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('en/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByText('Learning', { exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/programmes\/$/);
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden();
});

for (const route of ['en/', 'ar/', 'en/programmes/', 'ar/guides/certificate/', 'en/services/']) {
  test(`accessible, responsive rendering: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
          .map((animation) => animation.finished.catch(() => {})),
      ),
    );
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('old URLs lead to their replacement pages', async ({ page }) => {
  await page.goto('arabic-courses.html');
  await expect(page).toHaveURL(/\/ar\/programmes\/$/);
  await page.goto('guides.html#certificate');
  await expect(page).toHaveURL(/\/en\/guides\/certificate\/$/);
});

test('content and navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('en/');
  await expect(page.locator('.orbit-sculpture')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.motion-control')).toBeHidden();
  await page.goto('en/programmes/');
  await expect(page.locator('.programme-card')).toHaveCount(15);
  await page.locator('.programme-card').first().getByRole('link').first().click();
  await expect(page.locator('h1')).toBeVisible();
  await context.close();
});
