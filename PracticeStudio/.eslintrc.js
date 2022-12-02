module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'prettier/prettier': 0,
    'react-hooks/exhaustive-deps': 1,
    curly: 'off',
  },
  globals: {
    JSX: true,
  },
};
