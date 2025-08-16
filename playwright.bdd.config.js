import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// defineBddConfig() returns the testDir path for Playwright v8 API
const testDir = defineBddConfig({
  features: ['tests/bdd/features/**/*.feature'],
  steps: ['tests/bdd/steps/**/*.js'],
  // You can customize the outputDir if needed, default is .features-gen
  // outputDir: 'tests/.features-gen',
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
