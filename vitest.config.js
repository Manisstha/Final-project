import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'import.meta.env.VITE_PROJECT_URL': JSON.stringify('http://localhost:54321'),
    'import.meta.env.VITE_API_KEY': JSON.stringify('test-api-key'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/vitest.setup.js'],
    include: ['tests/**/*.test.[jt]s?(x)', 'tests/**/*.spec.[jt]s?(x)'],
    exclude: ['node_modules/**', 'dist/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
