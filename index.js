'use strict';

const plugins = [
  [
    require.resolve('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: true
    }
  ],
  [
    require.resolve('babel-plugin-transform-react-jsx'), {
      useBuiltIns: true
    }
  ],
  [
    require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true,
    }
  ],
  require.resolve('babel-plugin-transform-class-properties')
];

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
switch (true) {
  case env === 'test':
    module.exports = {
      presets: [
        [
          require('babel-preset-env').default, {
            targets: {
              node: 'current',
            },
          }
        ],
        require.resolve('babel-preset-react'),
      ],
      plugins: plugins.concat([
        require.resolve('babel-plugin-dynamic-import-node'),
        require.resolve('babel-plugin-transform-react-jsx-source'),
        require.resolve('babel-plugin-transform-react-jsx-self')
      ]),
    };
    break;
  case env === 'development':
    plugins.push.apply(plugins, [
      require.resolve('babel-plugin-transform-react-jsx-source'),
      require.resolve('babel-plugin-transform-react-jsx-self')
    ]);
    // fallthrough
  default:
    module.exports = {
      presets: [
        [
          require.resolve('babel-preset-env'), {
            targets: {
              ie: 9,
              uglify: true,
            },
            useBuiltIns: false,
            modules: false
          }
        ],
        require.resolve('babel-preset-react')
      ],
      plugins: plugins.concat([
        [
          require.resolve('babel-plugin-transform-regenerator'), {
            async: false
          }
        ]
        require.resolve('babel-plugin-syntax-dynamic-import'),
      ])
    };
}
