module.exports = {
  extends: ['eslint-config-xo-space/esnext', 'eslint-config-prettier', 'eslint-config-prettier/standard'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
};
