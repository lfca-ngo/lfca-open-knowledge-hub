module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next', 'prettier'],
  plugins: ['simple-import-sort', 'sort-destructure-keys'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        typedefs: false,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['info', 'error'],
      },
    ],
    'no-unused-vars': ['error'],
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: false,
      },
    ],
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'sort-keys': [
      'error',
      'asc',
      {
        caseSensitive: false,
        minKeys: 2,
        natural: false,
      },
    ],
    'sort-vars': 'error',
  },
}
