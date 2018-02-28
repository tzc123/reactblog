const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const outputPath = path.join(__dirname, 'ssr')
const appPath = path.join(__dirname, "blog-client/src/serverRouter.js")
const serverDomain = 'http://122.152.205.25:1234/'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = {
    entry: {
			app: appPath
		},
    output: {
        path: outputPath,
				filename: 'js/[name].js',
				libraryTarget: 'commonjs2' 
    },
    module: {
			strictExportPresence: true,
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-3']
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
						name: 'images/[name].[ext]'
					}
				}
			]
		},
		plugins: [
			// new BundleAnalyzerPlugin(),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": '"production"'
			}),
			new ExtractTextPlugin("css/style.css"),
			new webpack.ProvidePlugin({
				React: 'react'
			}),
			new CleanPlugin(outputPath, {
				beforeEmit: true
			})
		],
		target: 'node',
		node: {
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		}
};

module.exports = config