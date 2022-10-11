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
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'off',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': ['off', null],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',
    'arrow-parens': ['off', 'always'],
    'brace-style': ['off', 'off'],
    camelcase: 'error',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'id-match': 'error',
    'linebreak-style': 'off',
    'max-len': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-extra-semi': 'off',
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off',
    'quote-props': 'off',
    'no-implicit-coercion': ['error', { boolean: true, number: true, string: false }],
    'space-before-function-paren': 'off',
    'space-in-parens': ['off', 'never'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/display-name': 'off',
    'react/prop-types': 'off',

    // These rules are temporarily off and will reopen later to fix each rule.
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-no-target-blank': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'prefer-const': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'no-underscore-dangle': 'warn',
    'prefer-spread': 'warn',
    'react/no-children-prop': 'warn',
    'react/jsx-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
