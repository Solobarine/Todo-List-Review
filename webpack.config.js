/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
 mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
	plugins: [
    new HtmlWebpackPlugin({
			template: './src/index.html',
    }),
  ],
   devServer: {
    static: './dist',
   },
};
