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

  test('should receive a successful HTTPS response', async ({ page }) => {
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