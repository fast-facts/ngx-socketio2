const tseslint = require('typescript-eslint');
const config = require('eslint-config-final');

module.exports = tseslint.config(
  {
    ignores: [
      '**/node_modules/',
      '**/e2e/',
      'src/environments/',
      'eslint.config.js'
    ],
  },
  {
    files: ['**/*.ts'],

    extends: [
      ...config.typescript,
      ...config.angularTypescript,
    ],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: [
          './tsconfig.lib.json',
          './tsconfig.lib.prod.json',
          './tsconfig.spec.json',
        ],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['**/*.html'],

    extends: [
      ...config.angularTemplate,
    ]
  }
);