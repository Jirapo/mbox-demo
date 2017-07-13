const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
// const ModuleConcatenationPlugin = require('webpack/lib/ModuleConcatenationPlugin');
const { resolve } = require('path');

module.exports = {
	context: resolve(__dirname, '..'),
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: [
      'node_modules',
      resolve(__dirname, '..', 'src'),
    ],
    // alias: {
    //   'constants-nowa': resolve(__dirname, '..', 'src', 'constants'),
    // }
  },
  module: {
    rules: [
    	{
        test: /\.js$/,
        include: resolve(__dirname, '..', 'src'),
        // exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
              minimize: true,
              sourceMap: true,
            }
          },'less-loader'],
          fallback: 'style-loader',
        }),
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true,
        //       importLoaders: 2,
        //       sourceMap: true
        //     },
        //   },
        //   'less-loader',
        // ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        })
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true,
        //       sourceMap: true
        //     },
        //   },
        // ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png)\w*/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          }
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      }
    ]
  },
  plugins: [
  	new NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('style.css'),
  ]
};