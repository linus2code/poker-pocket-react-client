// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2021
  },
  extends: [
    'react-app',
    'react-app/jest',
    'eslint:recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  "rules": {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    "react/prop-types": 0,
    "react/no-unknown-property": ["error", { ignore: ["jsx"] }],
  }
};
