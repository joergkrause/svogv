
// see: https://www.ag-grid.com/ag-grid-webpack-ngtools/
// see: https://angular-2-training-book.rangle.io/handout/aot/aot_config.html

const path = require('path');
const webpack = require('webpack');

const helpers = require('./scripts/release/helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    polyfills: './src/demo/vendor/polyfills.ts',
    vendor: './src/demo/vendor/vendor-aot.ts',
    app: './src/demo/app/app-aot.ts'
  },

  output: {
    path: helpers.root('dist/aot'),
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
        loader: 'style!css!'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // AOT Plugin 
    new AotPlugin({
      tsConfigPath: './src/demo/tsconfig-ngc.json',
      entryModule: helpers.root('src/demo/app/app.module#RootModule')
    }),

    new HtmlWebpackPlugin({
      template: 'src/demo/index-aot.html'
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        keep_fnames: true,
        screw_i8: true
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
};