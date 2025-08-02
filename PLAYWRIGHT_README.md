# Playwright E2E Testing Setup

This project now includes Playwright for end-to-end testing. The tests are specifically designed to test the login functionality with the credentials you specified.

## Installation

Playwright has been installed and configured. The browsers have been downloaded automatically.

## Test Structure

- **Configuration**: `playwright.config.js` - Main Playwright configuration
- **Tests**: `tests/e2e/login.spec.js` - Login functionality tests

## Available Test Scripts

```bash
# Run all E2E tests (headless mode)
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug
```

## Test Cases Included

1. **Valid Login Test**: Tests login with `test2@test.com` and `Test123`
2. **Invalid Login Test**: Tests error handling with wrong credentials
3. **Navigation Tests**: Tests forgot password and sign up links
4. **UI Interaction Test**: Tests password visibility toggle

## Running the Tests

1. **Start your development server first**:
   ```bash
   npm run dev
   ```

2. **In a new terminal, run the tests**:
   ```bash
   # Basic test run
   npm run test:e2e
   
   # Or with UI for interactive testing
   npm run test:e2e:ui
   ```

## Test Configuration

The tests are configured to:
- Run against `http://localhost:5173` (your Vite dev server)
- Automatically start the dev server if not running
- Test in Chromium, Firefox, and WebKit browsers
- Generate HTML reports
- Include trace collection for debugging

## Notes

- The tests expect your application to be running on `http://localhost:5173`
- The login test uses the exact credentials you specified: `test2@test.com` / `Test123`
- Tests are designed to work with your Vue.js application's routing and authentication flow
- The configuration automatically starts your dev server before running tests

## Debugging

If tests fail:
1. Use `npm run test:e2e:headed` to see the browser actions
2. Use `npm run test:e2e:debug` to step through tests
3. Check the HTML report generated after test runs
4. Ensure your Supabase configuration is working for authentication