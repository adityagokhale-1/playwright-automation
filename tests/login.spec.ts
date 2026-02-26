import { test, expect } from '../fixtures/userFixture';

test('Verify valid users can login', async ({ page, user }) => {
    // Go to baseURL (from config)
    await page.goto('/');

    // Use env variables (NOT hardcoded)
    await page.locator('#user-name').fill(user.username);
    await page.locator('#password').fill(user.password);

    await page.locator('#login-button').click();

    // Validate successful login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});