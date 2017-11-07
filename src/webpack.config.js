const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

// the path(s) that should be cleaned
let pathsToClean = [
  './../static/dist'
]
// the clean options to use
let cleanOptions = {
  root:     __dirname,
  verbose:  true,
  dry:      false,
	allowExternal: true
}


module.exports = function(environment) {

	var CONFIG = {
	entry: {
		app: './js/main.js'
	},
	module: {
		rules: [
			{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
          // plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
						use: [
							{ loader: 'css-loader', options: { importLoaders: 1 } },
							'postcss-loader'
						]
					})
			}
		]
	},
	output: {
    path: path.join(__dirname, "./../static/dist/"),
		// filename: 'js/[name].bundle.[hash].js',
	},

	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},


	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions)
		// new ExtractTextPlugin({filename:  (getPath) => {return getPath('css/[name].[contenthash].css');},allChunks: true})
],
	watchOptions: {
		watch: true
	}
}


switch (environment) {
	case 'development':
		CONFIG.output.filename = 'js/[name].js'
		CONFIG.plugins.push(new ExtractTextPlugin({filename:  (getPath) => {return getPath('css/[name].css');},allChunks: true}))
	break;
	case 'production':
	 	CONFIG.output.filename = 'js/[name].[hash].js'		
		CONFIG.plugins.push(new ExtractTextPlugin({filename:  (getPath) => {return getPath('css/[name].[contenthash].css');},allChunks: true}))
	break;
	default:
		CONFIG.output.filename = 'js/[name].[hash].js'


}
return CONFIG;
};
