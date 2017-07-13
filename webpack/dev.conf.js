const { join } = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const webpackCommon = require('./common.conf');

const outdir = join(__dirname, '..', 'build');
module.exports = webpackMerge(webpackCommon, {
 
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
	
  output: {
    path: outdir,
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: outdir,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    // noInfo: true,
    // watchContentBase: true,
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, '..', 'static', 'index.html'),
    }),
    new HotModuleReplacementPlugin(),
  ]
})