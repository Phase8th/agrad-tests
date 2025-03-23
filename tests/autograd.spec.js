const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('https://agrad.ru/');
  await expect(page).toHaveTitle(/АВТОГРАД/);
}); 