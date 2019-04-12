const path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'final.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8000,
    hot: true
  },
  mode: 'development'
};
