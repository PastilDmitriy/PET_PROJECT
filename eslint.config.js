import eslintJs from '@eslint/js'; // Import as a default export
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

const { ESLint } = eslintJs;

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/', '.next/', '.next/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true,
      },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'import/prefer-default-export': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/react-in-jsx-scope': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'prettier/prettier': ['error'],
      semi: ['error', 'always'],
    },
  },
];
