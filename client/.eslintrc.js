module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'airbnb',
    'airbnb-base',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".eslintrc.js", "*.html"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'airbnb',
        'airbnb-base',
        'airbnb-typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
      rules: {
        'no-trailing-spaces': 0,
        'react/react-in-jsx-scope': 'off',
        camelcase: 'error',
        'spaced-comment': 'error',
        quotes: ['error', 'single'],
        'no-duplicate-imports': 'error',
        'react/no-array-index-key': 'warn',
        'max-len': 0, // Fixed rule name
        '@typescript-eslint/no-unused-expressions': 0,
        'jsx-quotes': [2, 'prefer-single'],
        'react/function-component-definition': [
          'error',
          {
            namedComponents: ['function-declaration', 'arrow-function'],
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/no-danger': 0,
        "linebreak-style": 0,
        "complexity": ["error", 5],
        "react/require-default-props": "off"
      },
    },
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {    
    "linebreak-style": 0,
    "react/require-default-props": "off"
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.backup'],
      },
    },
  },
};
