import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert';

Given('I open the application', async function () {
  await this.page.goto(this.baseURL + '/');
});

Given('I see the sign in page', async function () {
  const header = this.page.locator('h2:has-text("Sign In")');
  await header.waitFor({ state: 'visible' });
});

When('I sign in with email {string} and password {string}', async function (email, password) {
  await this.page.locator('input[type="email"][placeholder="Email"]').fill(email);
  await this.page.locator('input[placeholder="Password"]').fill(password);
  await this.page.locator('button[type="submit"]:has-text("Sign In")').click();
});

Then('I should be on the dashboard page', async function () {
  await this.page.waitForURL(/.*dashboard.*/, { timeout: 10000 });
  assert.strictEqual(this.page.url().endsWith('/dashboard'), true);
});

Then('I should see an error message', async function () {
  const errorMessage = this.page.locator('p.text-red-500');
  await errorMessage.waitFor({ state: 'visible', timeout: 5000 });
});

When('I click the {string} link', async function (linkText) {
  await this.page.locator(`a:has-text("${linkText}")`).click();
});

Then('I should be on {string}', async function (path) {
  await this.page.waitForURL(new URL(path, this.baseURL).toString());
});

When('I fill the password field with {string}', async function (pwd) {
  await this.page.locator('input[placeholder="Password"]').fill(pwd);
});

When('I toggle password visibility to show', async function () {
  await this.page.locator('.material-symbols-outlined:has-text("visibility")').click();
});

When('I toggle password visibility to hide', async function () {
  await this.page.locator('.material-symbols-outlined:has-text("visibility_off")').click();
});

Then('the password field type should be {string}', async function (expectedType) {
  const input = this.page.locator('input[placeholder="Password"]').first();
  const type = await input.getAttribute('type');
  assert.strictEqual(type, expectedType);
});
