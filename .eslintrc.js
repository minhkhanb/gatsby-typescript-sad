module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      useJSXTextNode: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
      alias: {
        map: [['@src', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:react-hooks/recommended', // Uses the recommended rules from @eslint-plugin-react-hooks
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    camelcase: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'no-underscore-dangle': 'warn',
    'prefer-spread': 'warn',
    'react/no-children-prop': 'warn',
    'react/jsx-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
};
