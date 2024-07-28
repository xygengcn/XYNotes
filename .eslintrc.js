module.exports = {
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-useless-escape': 0,
    'import/first': 0,
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/valid-attribute-name': 'off',
    semi: [
      'error',
      'always',
      {
        omitLastInOneLineBlock: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        MemberExpression: 1,
      },
    ],
    'no-tabs': 0,
    'no-undef-init': 0,
    'no-mixed-spaces-and-tabs': 0,
    'standard/no-callback-literal': [0, ['cb', 'callback']],
    'prefer-promise-reject-errors': [0],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-irregular-whitespace': 0,
    'space-after-keywords': [0, 'always'], // 关键字后面是否要空一格
    'space-before-blocks': [0, 'always'], // 不以新行开始的块{前面要不要有空格
    'space-in-parens': [1, 'never'], // 小括号里面要不要有空格
    'space-infix-ops': 1, // 中缀操作符周围要不要有空格
    'space-return-throw-case': 0, // return throw case后面要不要加空格
    'space-unary-ops': [
      1,
      {
        words: true,
        nonwords: false,
      },
    ], // 一元运算符的前/后要不要加空格
    'spaced-comment': 1, // 注释风格要不要有空格什么的
    'no-new': 'warn',
    'import/no-webpack-loader-syntax': 0,
    'brace-style': 0,
    'no-fallthrough': 0,
    '@typescript-eslint/indent': 0, // 禁用typescript 缩进的校验，与vue-eslint冲突
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'lines-between-class-members': 0,
    'no-useless-constructor': 0,
    'no-throw-literal': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-empty-function': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // 允许包含单引号的字符串使用双引号
        allowTemplateLiterals: true, // 允许使用模板字符串
      },
    ],
    'no-prototype-builtins': 0,
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'vue/script-setup-uses-vars': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
