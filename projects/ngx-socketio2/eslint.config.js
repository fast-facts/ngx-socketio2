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
          'projects/ngx-socketio2/tsconfig.lib.json',
          'projects/ngx-socketio2/tsconfig.lib.prod.json',
          'projects/ngx-socketio2/tsconfig.spec.json',
        ],
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