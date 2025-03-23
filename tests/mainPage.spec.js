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

  test('should receive a successful HTTP response', async ({ page }) => {
    // Intercept the network request
    page.on('response', async (response) => {
      if (response.url().includes('api/endpoint')) { // Replace with the actual endpoint you want to test
        expect(response.status()).toBe(200); // Check for a successful status code
        const responseBody = await response.json();
        // Add more assertions based on the expected response body
        expect(responseBody).toHaveProperty('key', 'expectedValue'); // Example assertion
      }
    });

    // Navigate to the page that triggers the request
    await page.goto('https://agrad.ru/');
  });
}); 