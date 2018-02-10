const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const outputPath = path.join(__dirname, 'blog-server/static')
const appPath = path.join(__dirname, "blog-client/src/app.js")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = {
    entry: {
			vendor: ['react', 'react-dom', 'react-router-dom'],
			app: appPath
		},
    output: {
        path: outputPath,
				filename: 'js/[name].[chunkhash:8].js',
				publicPath: '/'
    },
    module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3', 'react']
					}
				}, 
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use:[
							{
								loader: 'css-loader',
								options:{
										minimize: true
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									ident: 'postcss',
									plugins: () => [
										require('autoprefixer')({browsers: ['last 5 version']}),
										require('postcss-px2rem')({remUnit: 16})
									]
								}
							}
						]
					})
				},
				{
					test: /\.(jpeg|png|jpg|gif)$/,
					loader: 'url-loader',
					query: {
						limit: 8192,
						name: 'images/[name].[ext]?[hash]'
					}
				}
			]
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new HtmlPlugin({
				title: "DAZ'blog",
				template: path.join(__dirname, 'blog-client/index.html')
			}),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": '"production"'
			}),
			new ExtractTextPlugin("css/style.[contenthash:8].css"),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vender', 'manifest'],
				minChunks: 2,
			}),
			new webpack.optimize.UglifyJsPlugin({
				extractComments: true
			}),
			new CleanPlugin(outputPath, {
				beforeEmit: true
			}),
		],
		node: {
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		}
};

module.exports = config