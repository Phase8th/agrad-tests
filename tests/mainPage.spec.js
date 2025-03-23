const { test, expect } = require('@playwright/test');

test.describe('Main Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://agrad.ru/');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/АВТОГРАД/);
  });

  test('should have a visible header', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('navigation links should work', async ({ page }) => {
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      const url = await link.getAttribute('href');
      await link.click();
      await expect(page).toHaveURL(url);
      await page.goBack();
    }
  });
}); 