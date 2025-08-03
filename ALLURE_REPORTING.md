# Allure Reporting for Playwright Tests

This project is configured with Allure reporting to provide comprehensive and visually appealing test reports for your Playwright end-to-end tests.

## What is Allure?

Allure is a flexible, lightweight multi-language test reporting tool that provides:
- Beautiful and interactive HTML reports
- Test execution history and trends
- Detailed test steps and attachments
- Test categorization with epics, features, and stories
- Screenshots and videos for failed tests
- Test execution metrics and analytics

## Setup

The project is already configured with Allure reporting. The following dependencies have been installed:

- `allure-playwright` - Playwright reporter for Allure
- `allure-commandline` - Command line tool for generating and serving reports

## Configuration

### Playwright Configuration

The `playwright.config.js` has been updated to include the Allure reporter:

```javascript
reporter: [
  ['html'],           // Keep the default HTML reporter
  ['allure-playwright'] // Add Allure reporter
],
```

### Package.json Scripts

The following scripts have been added to `package.json`:

```json
{
  "allure:generate": "allure generate allure-results --clean",
  "allure:open": "allure open allure-report", 
  "allure:serve": "allure serve allure-results",
  "test:e2e:allure": "playwright test && npm run allure:serve"
}
```

## Running Tests with Allure

### Option 1: Run tests and automatically open Allure report
```bash
npm run test:e2e:allure
```

This command will:
1. Run all Playwright tests
2. Generate Allure results
3. Start a local server and open the Allure report in your browser

### Option 2: Run tests separately and generate report manually
```bash
# Run tests (generates allure-results folder)
npm run test:e2e

# Generate and serve the report
npm run allure:serve
```

### Option 3: Generate static report
```bash
# Run tests
npm run test:e2e

# Generate static HTML report
npm run allure:generate

# Open the generated report
npm run allure:open
```

## Allure Annotations in Tests

The tests have been enhanced with Allure annotations to provide better organization and reporting:

### Available Annotations

- `allure.epic()` - High-level business requirement (e.g., "Authentication")
- `allure.feature()` - Feature being tested (e.g., "Login", "Navigation")
- `allure.story()` - User story or specific scenario (e.g., "Valid Login")
- `allure.severity()` - Test importance: critical, normal, minor, trivial
- `allure.tag()` - Custom tags for filtering (e.g., "smoke", "regression")
- `allure.step()` - Individual test steps for detailed reporting

### Example Usage

```javascript
import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test('should login with valid credentials', async ({ page }) => {
  await allure.epic('Authentication');
  await allure.feature('Login');
  await allure.story('Valid Login');
  await allure.severity('critical');
  await allure.tag('smoke');
  await allure.tag('authentication');
  
  await allure.step('Navigate to the application', async () => {
    await page.goto('/');
  });
  
  await allure.step('Enter valid credentials', async () => {
    // Test implementation
  });
});
```

## Report Features

### Test Organization
- **Epics**: Group tests by major business areas
- **Features**: Organize by application features
- **Stories**: Individual test scenarios
- **Tags**: Filter tests by custom criteria

### Test Details
- **Steps**: Detailed breakdown of test execution
- **Screenshots**: Automatic screenshots on failures
- **Videos**: Test execution recordings (if enabled)
- **Logs**: Console output and debug information
- **Timing**: Execution duration for each step

### Analytics
- **Trends**: Test execution history over time
- **Categories**: Failure categorization
- **Environment**: Test environment information
- **Suites**: Test suite organization

## Viewing Reports

When you run `npm run allure:serve`, Allure will:
1. Generate the report from test results
2. Start a local web server (usually on port 4040)
3. Automatically open your browser to view the report

The report includes:
- **Overview**: Summary of test execution
- **Categories**: Test failure categories
- **Suites**: Test organization by suites
- **Graphs**: Visual representation of test results
- **Timeline**: Test execution timeline
- **Behaviors**: Tests organized by epics/features/stories

## Continuous Integration

For CI/CD pipelines, you can:

1. Run tests and generate Allure results:
   ```bash
   npm run test:e2e
   ```

2. Generate static report:
   ```bash
   npm run allure:generate
   ```

3. Publish the `allure-report` folder as build artifacts

## Troubleshooting

### Common Issues

1. **Allure command not found**
   - Ensure `allure-commandline` is installed globally
   - Try: `npm install -g allure-commandline`

2. **No test results**
   - Make sure tests have run and `allure-results` folder exists
   - Check that `allure-playwright` reporter is configured

3. **Report not opening**
   - Try manually opening: `http://localhost:4040`
   - Check if port 4040 is available

### File Structure

After running tests with Allure, you'll see:
```
project/
├── allure-results/     # Raw test results (generated)
├── allure-report/      # Generated HTML report (if using allure:generate)
├── playwright-report/  # Standard Playwright HTML report
└── test-results/       # Playwright test artifacts
```

## Best Practices

1. **Use meaningful annotations**: Choose descriptive epics, features, and stories
2. **Add relevant tags**: Use tags for test categorization and filtering
3. **Break down complex tests**: Use `allure.step()` for better readability
4. **Set appropriate severity**: Help prioritize test failures
5. **Keep reports clean**: Regularly clean old test results

## Additional Resources

- [Allure Documentation](https://docs.qameta.io/allure/)
- [Allure Playwright Integration](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright)
- [Playwright Testing Guide](https://playwright.dev/docs/test-intro)