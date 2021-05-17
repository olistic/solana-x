const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webDir = path.resolve(__dirname, 'web');

module.exports = {
  context: webDir,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    fallback: {
      assert: false,
    },
  },
  output: {
    path: path.join(webDir, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(webDir, 'public', 'index.html'),
    }),
  ],
  devServer: {
    port: 3000,
  },
};
