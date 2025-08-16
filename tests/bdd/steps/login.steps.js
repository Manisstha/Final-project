import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { epic, feature, story, severity, tag, step as allureStep } from 'allure-js-commons';

const { Given, When, Then } = createBdd();

Given('I open the application', async ({ page }) => {
  await page.goto('/');
});

Given('I see the sign in page', async ({ page }) => {
  await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
});

When('I sign in with email {string} and password {string}', async ({ page }, email, password) => {
  epic('Authentication');
  feature('Login');
  story('Sign In');
  severity('critical');
  tag('authentication');

  await allureStep('Enter credentials', async () => {
    await page.locator('input[type="email"][placeholder="Email"]').fill(email);
    await page.locator('input[placeholder="Password"]').fill(password);
  });

  await allureStep('Submit login form', async () => {
    await page.locator('button[type="submit"]:has-text("Sign In")').click();
  });
});

Then('I should be on the dashboard page', async ({ page }) => {
  await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 10000 });
  await expect(page).toHaveURL('/dashboard');
});

Then('I should see an error message', async ({ page }) => {
  const errorMessage = page.locator('p.text-red-500');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText(/invalid|error|failed|wrong/i);
});

When('I click the {string} link', async ({ page }, linkText) => {
  await page.locator(`a:has-text("${linkText}")`).click();
});

Then('I should be on {string}', async ({ page }, path) => {
  await expect(page).toHaveURL(path);
});

When('I fill the password field with {string}', async ({ page }, pwd) => {
  await page.locator('input[placeholder="Password"]').fill(pwd);
});

When('I toggle password visibility to show', async ({ page }) => {
  await page.locator('.material-symbols-outlined:has-text("visibility")').click();
});

When('I toggle password visibility to hide', async ({ page }) => {
  await page.locator('.material-symbols-outlined:has-text("visibility_off")').click();
});

Then('the password field type should be {string}', async ({ page }, expectedType) => {
  await expect(page.locator('input[placeholder="Password"]').first()).toHaveAttribute('type', expectedType);
});
