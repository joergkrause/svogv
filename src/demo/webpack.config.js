
// see: https://www.ag-grid.com/ag-grid-webpack-ngtools/
// see: https://angular-2-training-book.rangle.io/handout/aot/aot_config.html

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    polyfills: './vendor/polyfills.ts',
    vendor: './vendor/vendor.ts',
    app: './app/app.ts'
  },

  output: {
    path: path.join(__dirname, '../../dist/demo'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!'
      }
    ]
  },
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: path.join(__dirname, './app/app.module#RootModule')
    }),

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
};