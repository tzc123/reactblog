const webpack = require('webpack')
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const outputPath = path.join(__dirname, 'blog-server/build')
const appPath = path.join(__dirname, "blog-client/src/app.js")
const config = {
		devtool: 'source-map',
    entry: {
			app: appPath
		},
    output: {
        path: outputPath,
				filename: 'js/[name].[hash].js',
				publicPath: '/'
    },
    module: {
        loaders: [

					{
            test: /\.js?$/,
            exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react', 'stage-3'],
							plugins: [
									[
										'transform-runtime', {
											"polyfill": false,
											"regenerator": false,
											"moduleName": "babel-runtime"
										}
									],
									"transform-decorators-legacy",
									"transform-decorators",
									"transform-class-properties"
							]
						}
					}, 
					{
						test: /\.css$/,
						use: ExtractTextPlugin.extract({
							fallback: "style-loader",
							use:[
										'css-loader',
										{
											loader: 'postcss-loader',
											options: {
												ident: 'postcss',
												plugins: () => [
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
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": `"development"`,
				"process.env.DEV": `"${process.env.DEV}"`				
			}),
			new webpack.ProvidePlugin({
				React: 'react'
			}),
			new ExtractTextPlugin("css/style.css"),
			new HtmlPlugin({
				title: "DAZ'blog",
				template: path.join(__dirname, 'blog-client/index.html'),
				favicon: path.join(__dirname, 'blog-client/favicon.ico')
			})
		],
	devServer: {
		contentBase: '/build',
		historyApiFallback: true,
		inline: true,
		hot: true,
		port: 8080
	}
};

module.exports = config