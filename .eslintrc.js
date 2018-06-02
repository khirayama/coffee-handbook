module.exports = {
  extends: ['eslint-config-xo-space/esnext', 'eslint-config-prettier', 'eslint-config-prettier/standard'],
  plugins: ['eslint-plugin-prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'always-multiline'],
  },
};
