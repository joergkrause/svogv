/**
 * Creates the module for publishing to NPM registry.
 */

const path = require('path');
const DefinePlugin = require('webpack').DefinePlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TypescriptDeclarationPlugin = require('typescript-declaration-webpack-plugin');

const ENV = (process.env.NODE_ENV = process.env.ENV = 'production');

module.exports = {
  entry: {
    "svogv": './src/lib/module.ts',
    "svogv.min": './src/lib/module.ts'
  },
  mode: process.env.NODE_ENV,
  optimization: {
    minimizer: [new UglifyJsPlugin({
      include: /(\.)*svogv.min/
    })]    
  },
  output: {
    path: path.join(__dirname, 'dist/lib'),
    publicPath: '/',
    library: 'Svogv',
    libraryTarget: 'umd',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack!ts-loader'
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
    new DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(ENV)
      }
    }),
    // new TypescriptDeclarationPlugin({
    //   out: 'index.d.ts'
    // }),
    new CopyWebpackPlugin([
      {
        from : './src/lib/package.json',
        to: './'
      },
      {
        from : './src/lib/README.md',
        to: './'
      },
      {
        from : './LICENSE',
        to: './'
      }
    ]),
  new ContextReplacementPlugin(
      /@angular(\\|\/)core(\\|\/)esm5/,
      path.join(__dirname, './client')
    ),
    new FilterWarningsPlugin({
      exclude: /System.import/
    }),
    new AngularCompilerPlugin({
      tsConfigPath: './src/lib/tsconfig.json',
      entryModule: path.join(__dirname, 'src/lib/module#SvogvModule'),
      sourceMap: true      
    })
  ]
};
