import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    files: ['tests/**/*.ts'],
    extends: [playwright.configs['flat/recommended']],
    languageOptions: { parser: tseslint.parser },
  },
]);
