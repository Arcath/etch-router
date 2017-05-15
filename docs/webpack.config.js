var path = require('path')

module.exports = {
  target: 'web',
  entry: {
    main: './js/main.js'
  },
  output: {
    filename: '[name].pack.js',
    path: path.join(__dirname, 'assets')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]&publicPath=/assets/'
      }
    ]
  }
}
