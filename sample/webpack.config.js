const path = require('path');

module.exports = {
  mode:'production',
  entry: {
    index:'./src/index.js'
  },
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude:/(node_modules)/,
        loader:'babel-loader',
        options:{
          presets:['env']
        }
      }
    ]
  }
};