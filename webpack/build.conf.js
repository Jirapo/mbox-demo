const { join } = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackCommon = require('./common.conf');
const outdir = join(__dirname, '..', 'build');
module.exports = webpackMerge(webpackCommon, {
	entry: {
    vendor: './src/vendor.js',
    app: './src/index.js',
  },
	output: {
    path: outdir,
    filename: '[name]-[chunkhash].min.js',
    chunkFilename: '[chunkhash].js'
  },
	plugins: [
		new CommonsChunkPlugin({
		  name: ['vendor', 'manifest'],
		  minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
		  inject: true,
		  template: join(__dirname, '../static/index.html'),
		  minify: {
		    removeComments: true,
		    collapseWhitespace: true,
		    removeRedundantAttributes: true,
		    useShortDoctype: true,
		    removeEmptyAttributes: true,
		    removeStyleLinkTypeAttributes: true,
		    keepClosingSlash: true,
		    minifyJS: true,
		    minifyCSS: true,
		    minifyURLs: true
		  }
		}),
		new CleanWebpackPlugin(outdir, {
			root: join(__dirname, '..')
		}),
		new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: join(outdir, 'analyzer-report.html'),
    }),
	]
	// entry: {
 //    app: [
 //      'babel-polyfill',
 //      './src/index.js'
 //    ],
 //  }
})