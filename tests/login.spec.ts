import { test, expect } from '@playwright/test';

test('QA user can login to SauceDemo', async ({ page }) => {
    // Go to baseURL (from config)
    await page.goto('/');

    // Use env variables (NOT hardcoded)
    await page.locator('#user-name').fill(process.env.USERNAME!);
    await page.locator('#password').fill(process.env.PASSWORD!);

    await page.locator('#login-button').click();

    // Validate successful login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});