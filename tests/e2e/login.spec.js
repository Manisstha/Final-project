import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should login with valid credentials', async ({ page }) => {
    // Navigate to the application (will redirect to /auth/signin)
    await page.goto('/');
    
    // Wait for the sign in page to load
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    
    // Fill in the email field
    const emailInput = page.locator('input[type="email"][placeholder="Email"]');
    await emailInput.fill('test2@test.com');
    
    // Fill in the password field
    const passwordInput = page.locator('input[placeholder="Password"]');
    await passwordInput.fill('Test123');
    
    // Submit the form
    const submitButton = page.locator('button[type="submit"]:has-text("Sign In")');
    await submitButton.click();
    
    // Wait for navigation to dashboard after successful login
    await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 10000 });
    
    // Verify we're on the dashboard page
    // You can add more specific assertions based on your dashboard content
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Navigate to the application (will redirect to /auth/signin)
    await page.goto('/');
    
    // Wait for the sign in page to load
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    
    // Fill in invalid credentials
    const emailInput = page.locator('input[type="email"][placeholder="Email"]');
    await emailInput.fill('invalid@test.com');
    
    const passwordInput = page.locator('input[placeholder="Password"]');
    await passwordInput.fill('wrongpassword');
    
    // Submit the form
    const submitButton = page.locator('button[type="submit"]:has-text("Sign In")');
    await submitButton.click();
    
    // Wait for error message to appear
    const errorMessage = page.locator('p.text-red-500');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    
    // Verify error message contains relevant text
    await expect(errorMessage).toContainText(/invalid|error|failed|wrong/i);
  });

  test('should navigate to forgot password page', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Wait for the sign in page to load
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    
    // Click on forgot password link
    const forgotPasswordLink = page.locator('a:has-text("Forgot password?")');
    await forgotPasswordLink.click();
    
    // Verify navigation to forgot password page
    await expect(page).toHaveURL('/auth/forgot-password');
  });

  test('should navigate to sign up page', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Wait for the sign in page to load
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    
    // Click on sign up link
    const signUpLink = page.locator('a:has-text("Sign up here")');
    await signUpLink.click();
    
    // Verify navigation to sign up page
    await expect(page).toHaveURL('/auth/signup');
  });

  test('should toggle password visibility', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');
    
    // Wait for the sign in page to load
    await expect(page.locator('h2:has-text("Sign In")')).toBeVisible();
    
    // Fill in password
    const passwordInput = page.locator('input[placeholder="Password"]');
    await passwordInput.fill('Test123');
    
    // Verify password is hidden by default
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click the visibility toggle
    const visibilityToggle = page.locator('.material-symbols-outlined:has-text("visibility")');
    await visibilityToggle.click();
    
    // Verify password is now visible
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click the visibility toggle again
    const visibilityOffToggle = page.locator('.material-symbols-outlined:has-text("visibility_off")');
    await visibilityOffToggle.click();
    
    // Verify password is hidden again
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});