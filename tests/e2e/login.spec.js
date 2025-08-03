import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, tag, step } from 'allure-js-commons';

test.describe('Login Tests', () => {
  test('should login with valid credentials', async ({ page }) => {
    epic('Authentication');
    feature('Login');
    story('Valid Login');
    severity('critical');
    tag('smoke');
    tag('authentication');
    
    await step('Navigate to the application', async () => {
      await page.goto('/');
    });
    
    await step('Verify sign in page is loaded', async () => {
      await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    });
    
    await step('Enter valid credentials', async () => {
      const emailInput = page.locator('input[type="email"][placeholder="Email"]');
      await emailInput.fill('test2@test.com');
      
      const passwordInput = page.locator('input[placeholder="Password"]');
      await passwordInput.fill('Test123');
    });
    
    await step('Submit login form', async () => {
      const submitButton = page.locator('button[type="submit"]:has-text("Sign In")');
      await submitButton.click();
    });
    
    await step('Verify successful login and navigation to dashboard', async () => {
      await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 10000 });
      await expect(page).toHaveURL('/dashboard');
    });
  });

  test('should show error with invalid credentials', async ({ page }) => {
    epic('Authentication');
    feature('Login');
    story('Invalid Login');
    severity('critical');
    tag('negative');
    tag('authentication');
    
    await step('Navigate to the application', async () => {
      await page.goto('/');
    });
    
    await step('Verify sign in page is loaded', async () => {
      await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    });
    
    await step('Enter invalid credentials', async () => {
      const emailInput = page.locator('input[type="email"][placeholder="Email"]');
      await emailInput.fill('invalid@test.com');
      
      const passwordInput = page.locator('input[placeholder="Password"]');
      await passwordInput.fill('wrongpassword');
    });
    
    await step('Submit login form', async () => {
      const submitButton = page.locator('button[type="submit"]:has-text("Sign In")');
      await submitButton.click();
    });
    
    await step('Verify error message is displayed', async () => {
      const errorMessage = page.locator('p.text-red-500');
      await expect(errorMessage).toBeVisible({ timeout: 5000 });
      await expect(errorMessage).toContainText(/invalid|error|failed|wrong/i);
    });
  });

  test('should navigate to forgot password page', async ({ page }) => {
    epic('Authentication');
    feature('Navigation');
    story('Forgot Password Navigation');
    severity('normal');
    tag('navigation');
    tag('authentication');
    
    await step('Navigate to the application', async () => {
      await page.goto('/');
    });
    
    await step('Verify sign in page is loaded', async () => {
      await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    });
    
    await step('Click forgot password link', async () => {
      const forgotPasswordLink = page.locator('a:has-text("Forgot password?")');
      await forgotPasswordLink.click();
    });
    
    await step('Verify navigation to forgot password page', async () => {
      await expect(page).toHaveURL('/auth/forgot-password');
    });
  });

  test('should navigate to sign up page', async ({ page }) => {
    epic('Authentication');
    feature('Navigation');
    story('Sign Up Navigation');
    severity('normal');
    tag('navigation');
    tag('authentication');
    
    await step('Navigate to the application', async () => {
      await page.goto('/');
    });
    
    await step('Verify sign in page is loaded', async () => {
      await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    });
    
    await step('Click sign up link', async () => {
      const signUpLink = page.locator('a:has-text("Sign up here")');
      await signUpLink.click();
    });
    
    await step('Verify navigation to sign up page', async () => {
      await expect(page).toHaveURL('/auth/signup');
    });
  });

  test('should toggle password visibility', async ({ page }) => {
    epic('Authentication');
    feature('UI Components');
    story('Password Visibility Toggle');
    severity('minor');
    tag('ui');
    tag('authentication');
    
    await step('Navigate to the application', async () => {
      await page.goto('/');
    });
    
    await step('Verify sign in page is loaded', async () => {
      await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    });
    
    await step('Enter password', async () => {
      const passwordInput = page.locator('input[placeholder="Password"]');
      await passwordInput.fill('Test123');
    });
    
    await step('Verify password is hidden by default', async () => {
      const passwordInput = page.locator('input[placeholder="Password"]');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
    
    await step('Toggle password visibility to show', async () => {
      const visibilityToggle = page.locator('.material-symbols-outlined:has-text("visibility")');
      await visibilityToggle.click();
      
      const passwordInput = page.locator('input[placeholder="Password"]');
      await expect(passwordInput).toHaveAttribute('type', 'text');
    });
    
    await step('Toggle password visibility to hide', async () => {
      const visibilityOffToggle = page.locator('.material-symbols-outlined:has-text("visibility_off")');
      await visibilityOffToggle.click();
      
      const passwordInput = page.locator('input[placeholder="Password"]');
      await expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });
});