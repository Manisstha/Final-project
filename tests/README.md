Test Architecture

- unit/: Unit tests run by Vitest.
- integration/: Integration tests run by Vitest.
- e2e/: End-to-end tests run by Playwright.

Guidelines:
- Keep unit tests fast and isolated; mock external services.
- Integration tests may hit local modules but avoid network by default.
- E2E tests use Playwright, live against the dev server started by Playwright config.

Commands:
- Vitest (unit/integration): npx vitest or add a script.
- Playwright (e2e): npm run test:e2e
