process.env.VITE_PROJECT_URL = 'http://localhost:54321';
process.env.VITE_API_KEY = 'test-api-key';

// Polyfill import.meta.env for Vite-style env usage
if (!globalThis.importMetaEnvPatched) {
  globalThis.importMetaEnvPatched = true;
  globalThis.import_meta_env = {
    VITE_PROJECT_URL: process.env.VITE_PROJECT_URL,
    VITE_API_KEY: process.env.VITE_API_KEY,
  };
  Object.defineProperty(globalThis, 'import.meta', {
    value: { env: globalThis.import_meta_env },
    configurable: true,
  });
}
