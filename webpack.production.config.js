const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const outputPath = path.join(__dirname, 'static')
const appPath = path.join(__dirname, "blog-client/src/app.js")
const serverDomain = 'http://122.152.205.25:1234/'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = {
    entry: {
			vendor: ['react', 'react-dom', 'react-router-dom', 'regenerator-runtime', 'axios', 'polyfill'],
			app: appPath
		},
    output: {
        path: outputPath,
				filename: 'js/[name].[chunkhash:8].js',
				publicPath: serverDomain
    },
    module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: [['env', {
							"targets": {
								"browsers": ["last 2 versions", "safari >= 7"]
							},
							"useBuiltIns": true,
						}], 'stage-3', 'react'],
						plugins: [['transform-runtime', {
							"polyfill": true,
							"regenerator": true,
							"moduleName": "babel-runtime"
						}]]
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
						name: 'image/[name].[ext]?[hash]'
					}
				}
			]
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new HtmlPlugin({
				title: "DAZ'blog",
				template: path.join(__dirname, 'blog-client/index.html'),
				favicon: path.join(__dirname, 'blog-client/favicon.ico')				
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