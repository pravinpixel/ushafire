module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "alias": {
        "map": [
          [
            "src",
            "./src"
          ]
        ],
        "extensions": [
          ".ts",
          ".tsx",
          ".json"
        ]
      }
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'react',
    'perfectionist',
    'unused-imports'
  ],
  rules: {
    "no-alert": 0,
    "camelcase": 0,
    "no-console": 1,
    "no-param-reassign": 0,
    "naming-convention": 0,
    "default-param-last": 0,
    "no-underscore-dangle": 0,
    "no-use-before-define": 0,
    "no-restricted-exports": 0,
    "react/no-children-prop": 0,
    "react/forbid-prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/no-array-index-key": 0,
    "no-promise-executor-return": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "react/function-component-definition": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "max-lines": ["error", {
      "max": 350,
      "skipBlankLines": true,
      "skipComments": true,
    }],
    "react/jsx-no-useless-fragment": [
      1,
      {
        "allowExpressions": true
      }
    ],
    "prefer-destructuring": [
      1,
      {
        "object": true,
        "array": false
      }
    ],
    "react/no-unstable-nested-components": [
      1,
      {
        "allowAsProps": true
      }
    ],
    "no-unused-vars": [
      1,
      {
        "args": "none"
      }
    ],
    "react/jsx-no-duplicate-props": [
      1,
      {
        "ignoreCase": false
      }
    ],
    // unused-imports
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    "unused-imports/no-unused-imports": 1,
    "unused-imports/no-unused-vars": [
      0,
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    // perfectionist
    // https://eslint-plugin-perfectionist.azat.io/
    "perfectionist/sort-named-imports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-named-exports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-exports": [
      1,
      {
        "order": "asc",
        "type": "line-length"
      }
    ],
    "perfectionist/sort-imports": [
      1,
      {
        "order": "asc",
        "type": "line-length",
        "newlines-between": "always",
        "groups": [
          [
            "builtin",
            "external"
          ],
          "custom-mui",
          "custom-theme",
          "custom-assets",
          "custom-types",
          "custom-helper",
          "custom-routes",
          "custom-configs",
          "custom-zustand-config",
          "custom-store",
          "internal",
          "custom-views",
          "custom-pages",
          [
            "parent",
            "sibling",
            "index"
          ],
          "object",
          "unknown"
        ],
        "custom-groups": {
          "value": {
            "custom-mui": "@mui/**",
            "custom-theme": "theme/**",
            "custom-assets": "assets/**",
            "custom-types": "types/**",
            "custom-helper": "helper/**",
            "custom-routes": "routes/**",
            "custom-configs": "configs/**",
            "custom-zustand-config": "zustand-config/**",
            "custom-store": "store/**",
            "custom-views": "views/**",
            "custom-pages": "pages/**",
          }
        },
        "internal-pattern": [
          "src/**"
        ]
      }
    ]

  },
}