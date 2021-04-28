module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: '^17.0.2',
    },
  },
  rules: {
    semi: ['error', 'never'],
    'global-require': 'off',
    'react/jsx-fragments': [true, 'syntax'], // Disabled because the react version specified suppourts fragments
  },
}
