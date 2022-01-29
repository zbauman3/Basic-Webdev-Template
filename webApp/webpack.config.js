const path = require('path');
const config = require('../shared/dist/config').default;

const browserslist = '> 0.09%, not IE 11, not dead';
const isDevServer = (`${process.env[config.env.WEBPACK_DEV_SERVER]}` === 'true');

module.exports = {
	mode: (isDevServer ? 'development' : 'production'),
	devtool: false,
	target: (isDevServer
		? 'web'
		: `browserslist:${browserslist}`
	),
	devServer: {
		allowedHosts: 'all',
		host: '0.0.0.0',
		port: config.ports.webpack,
		static: false,
		liveReload: true,
		hot: false,
	},
	optimization: {
		minimize: false,
		sideEffects: true,
		usedExports: true,
		providedExports: true,
	},
	performance: {
		hints: false
	},
	entry: path.resolve(__dirname, './src/App.tsx'),
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				include: [
					path.resolve(__dirname, './src/')
				],
				exclude: [
					/node_modules/,
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							require.resolve('@babel/preset-react'),
							[
								require.resolve('@babel/preset-env'),
								{
									modules: false,
									targets: browserslist,
									useBuiltIns: "usage",
									corejs: "3.20",
								}
							],
							[
								require.resolve("@babel/preset-typescript"),
								{
									allowDeclareFields: false,
									allowNamespaces: true,
									isTSX: false,
									jsxPragma: 'React',
									jsxPragmaFrag: 'React.Fragment',
									onlyRemoveTypeImports: false
								}
							]
						]
					}
				}
			}
		]
	}
};