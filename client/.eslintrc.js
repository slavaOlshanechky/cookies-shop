module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: [0, 4],
    semi: [2, 'always'],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
    'multiline-ternary': ['off'],
  },
};
