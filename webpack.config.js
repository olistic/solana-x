const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientDir = path.resolve(__dirname, 'client');

module.exports = {
  context: clientDir,
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
    path: path.join(clientDir, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(clientDir, 'public', 'index.html'),
    }),
  ],
  devServer: {
    port: 3000,
  },
};
