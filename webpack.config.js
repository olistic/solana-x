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
  output: {
    path: path.join(clientDir, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(clientDir, 'public', 'index.html'),
    }),
  ],
};
