const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals');
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const outputPath = path.join(__dirname, 'ssr')
const appPath = path.join(__dirname, "blog-client/src/serverRender.js")
const serverDomain = 'http://122.152.205.25:1234/'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = {
    entry: {
			app: appPath
		},
    output: {
        path: outputPath,
				filename: 'js/[name].js',
				library: 'server',
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
						presets: ['react', 'stage-3'],
						plugins: [						
							"transform-decorators-legacy",
							"transform-decorators",
							"transform-class-properties"
						]
					}
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
		},
		externals: [nodeExternals()]
};

module.exports = config