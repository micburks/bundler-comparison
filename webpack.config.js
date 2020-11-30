const path = require('path');
module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: require('path').resolve('results'),
    filename: 'webpack.js',
    libraryTarget: 'commonjs'
  },
  devtool: 'source-map',
  cache: {
    type: 'filesystem',
  },
};
