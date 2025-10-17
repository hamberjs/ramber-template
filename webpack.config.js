const webpack = require('webpack');
const WebpackModules = require('webpack-modules');
const path = require('path');
const config = require('ramber/config/webpack.js');
const pkg = require('./package.json');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { hamber: path.resolve('node_modules', 'hamber') };
const extensions = ['.mjs', '.js', '.json', '.hamber', '.html'];
const mainFields = ['hamber', 'module', 'browser', 'main'];
const fileLoaderRule = {
	test: /\.(png|jpe?g|gif)$/i,
	use: [
		'file-loader',
	]
};

module.exports = {
	client: {
		entry: config.client.entry(),
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(hamber|html)$/,
					use: {
						loader: 'hamber-loader',
						options: {
							compilerOptions: {
								dev,
								hydratable: true
							},
							// Webpack 4 uses acorn v6 which doesn't work with HMR
							// Use overrides from npm or resolutions from yarn to set minimal
							// acorn version to v7+
							hotReload: false
						}
					}
				},
				fileLoaderRule
			]
		},
		mode,
		plugins: [
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
		].filter(Boolean),
		devtool: dev && 'inline-source-map'
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(hamber|html)$/,
					use: {
						loader: 'hamber-loader',
						options: {
							compilerOptions: {
								css: false,
								generate: 'ssr',
								hydratable: true,
								dev
							},
						}
					}
				},
				fileLoaderRule
			]
		},
		mode,
		plugins: [
			new WebpackModules()
		],
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode
	}
};
