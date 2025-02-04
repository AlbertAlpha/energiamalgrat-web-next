import path from 'node:path';
import { fileURLToPath } from 'node:url';
import drizzle from 'eslint-plugin-drizzle';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      drizzle,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'postcss.config.mjs', 'prettier.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/require-await': 'off',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      'drizzle/enforce-delete-with-where': [
        'error',
        {
          drizzleObjectName: ['db', 'ctx.db'],
        },
      ],

      'drizzle/enforce-update-with-where': [
        'error',
        {
          drizzleObjectName: ['db', 'ctx.db'],
        },
      ],
    },
  },
];

export default eslintConfig;
