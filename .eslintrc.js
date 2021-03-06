module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
    'array-callback-return': 'off',
    'lines-between-class-members': 'off',
    'dot-notation': 'off',
    'react/no-unescaped-entities': 'off',
    'no-unneeded-ternary': 'off',
  },
}
