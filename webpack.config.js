'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

module.exports = {
    //devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[file].map'
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
                test: /\.json?$/,
                loader: 'json'
            }, {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss-loader'
            }]
    },
    postcss: function plugins(bundler) {
        return [
            require('postcss-import')({ addDependencyTo: bundler }),
            require('precss')(),
            require('autoprefixer')({
                browsers: AUTOPREFIXER_BROWSERS,
            })
        ];
    }
};
