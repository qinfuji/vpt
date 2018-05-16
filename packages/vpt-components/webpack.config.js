const path = require('path')
const {
  plugins,
  rules
} = require('webpack-atoms');

module.exports = {
  devtool: 'source-map',
  entry: {
    'vpt-components': './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'VptComponents',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      rules.js()
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    plugins.define(),
    // plugins.uglify(),
    plugins.banner({
      banner: '',
      entryOnly: true
    }),
  ],
  node: {
    Buffer: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}