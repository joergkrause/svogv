/**
 * Creates the module for publishing to NPM registry.
 */

const path = require('path');
const webpack = require('webpack');

const helpers = require('./scripts/release/helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    lib: './src/lib/module.ts'
  },

  output: {
    path: helpers.root('dist/lib'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
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
    new webpack.optimize.CommonsChunkPlugin({
      name: ['lib']
    }),

    // AOT Plugin 
    new AotPlugin({
      tsConfigPath: './src/lib/tsconfig.json',
      entryModule: helpers.root('src/lib/module#SvogvModule')
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
};