import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Ignore generated and external content
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'allure-report/**',
      'allure-results/**',
      'playwright-report/**',
      'test-results/**',
      'public/**',
      '.vscode/**',
      '.qodo/**',
    ],
  },

  // Base language options
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },

  // Recommended JS rules
  js.configs.recommended,

  // Vue 3 recommended rules (supports .vue SFCs)
  ...pluginVue.configs['flat/recommended'],

  // Project-level rule tweaks
  {
    rules: {
      // Allow single-word component names for this project (e.g., App, Auth, Dashboard)
      'vue/multi-word-component-names': 'off',
      // Do not enforce attribute ordering
      'vue/attributes-order': 'off',
    },
  },

  // Node context for config files and tooling
  {
    files: [
      'vite.config.*',
      'vitest.config.*',
      'cucumber.cjs',
      '*.config.*',
      'cucumber.*',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Test files: enable Vitest globals
  {
    files: [
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
      'tests/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.vitest,
      },
    },
    rules: {
      // Allow empty blocks in test hooks/placeholders
      'no-empty': 'off',
    },
  },

  // API layer can access process.*
  {
    files: ['src/api/**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },

  // Turn off stylistic rules that might conflict with Prettier (if you add it later)
  eslintConfigPrettier,
];
