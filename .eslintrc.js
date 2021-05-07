module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/display-name': 'off',
    'no-mixed-operators':
      process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-unsafe-finally': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ], //will ignore any unused args starting with underscore
    'react/prop-types': 'off',
    'no-console': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'no-undef': 'off',
    'no-class-assign': 'off',
    'no-extra-semi': 'error',
    'no-useless-escape': 'error',
    'react/no-unescaped-entities': 'error',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'warn' : 'error',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
  },
  env: {
    browser: true,
  },
};