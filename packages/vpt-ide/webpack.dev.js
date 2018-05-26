'use strict';
//  Summary:
//    Get webpack config for different targets

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-inline-source-map',
  mode: 'production', //styled-component 可能没有配置好，这里需要使用生产模式
  cache: true,
  context: path.join(__dirname, 'app/web'),
  target: 'web',
  performance: {
    hints: false,
    maxEntrypointSize: 250,
    maxAssetSize: 1000
  },
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://127.0.0.1:9000/__webpack_hmr',
      './styles/index.less',
      './styles/antdCustom.less',
      './index'
    ]
  },

  output: {
    // Js bundle name, [name] will be replaced by which is in entry
    filename: '[name].js',
    // Where to save your build result
    path: path.join(__dirname, 'public'),
    // Exposed asset path. NOTE: the end '/' is necessary
    publicPath: '/public/'
  },

  stats: 'errors-only',

  plugins: _.compact([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'app/web'),
      manifest: require(path.join(__dirname, './dll/manifest.json'))
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './node_modules/monaco-editor/min/vs'),
        to: path.join(__dirname, 'public/libs/vs')
      },
      {
        from: path.join(__dirname, './app/web/libs'),
        to: path.join(__dirname, 'public/libs')
      },
      {
        from: path.join(__dirname, 'app/web/images'),
        to: path.join(__dirname, 'public/images')
      },
      {
        from: path.join(__dirname, 'app/web/fonts'),
        to: path.join(__dirname, 'public/fonts')
      },
      {
        from: path.join(__dirname, 'dll'),
        to: path.join(__dirname, 'public/dll')
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'visual prototype tools',
      template: path.join(__dirname, 'app/web/index.html'),
      excludeChunks: ['main']
    })
  ]),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|build/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.(ttf|eot|svg|woff)$/,
        loader: 'url-loader?limit=1000000' // TODO: it seems only inline base64 font works.
      },
      {
        test: /\.less$/,
        loader:
          'style-loader!css-loader?sourceMap!less-loader?{"sourceMap":true,"javascriptEnabled": true}'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
};
