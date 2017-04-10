module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': ['ivantage', 'plugin:react/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'globals': {
    'describe': false,
    'expect': false,
    'it': false,
    'jest': false
  }
}
