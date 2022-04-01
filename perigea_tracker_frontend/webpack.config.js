const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/ ,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: 8081,
    contentBase: path.join(__dirname, 'public')
  },
  resolve: {
    alias: {
        'react-native$': 'react-native-web'
    }
  },
  externals: {
    "react-native": true, 

  }
};