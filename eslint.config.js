const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('angular-eslint');
const rxjs = require('eslint-plugin-rxjs-updated');
const rxjsAngular = require('eslint-plugin-rxjs-angular-updated');

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
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angularPlugin.configs.tsRecommended,
      rxjs.configs.recommended,
    ],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: [
          'projects/ngx-socketio2/tsconfig.lib.json',
          'projects/ngx-socketio2/tsconfig.lib.prod.json',
          'projects/ngx-socketio2/tsconfig.spec.json',
        ],
      },
    },

    plugins: {
      '@typescript-eslint': tsPlugin,
      rxjs,
      'rxjs-angular': rxjsAngular,
    },

    rules: {
      eqeqeq: ['error', 'always', {
        null: 'ignore',
      }],
      'no-return-await': 'error',
      'prefer-arrow-callback': 'error',
      'quote-props': ['error', 'as-needed'],
      semi: ['error', 'always'],

      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-empty': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'rxjs/no-nested-subscribe': 'off',
      'rxjs/no-unsafe-catch': 'error',
      'rxjs/no-unsafe-switchmap': 'error',
      'rxjs/no-unsafe-takeuntil': 'error',

      'rxjs-angular/prefer-takeuntil': 'error',
    },
  },
  {
    files: ['**/*.html'],

    extends: [
      ...angularPlugin.configs.templateRecommended,
    ]
  }
);