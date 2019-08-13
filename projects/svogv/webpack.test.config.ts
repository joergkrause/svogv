const webpack = require('webpack');

const FILTER = process.env.KARMA_FILTER;

let KARMA_SPEC_FILTER = '/.spec.ts$/';
if (FILTER) {
  KARMA_SPEC_FILTER = `/${FILTER}.spec.ts$/`;
}
module.exports = {
  plugins: [new webpack.DefinePlugin({KARMA_SPEC_FILTER})]
};
