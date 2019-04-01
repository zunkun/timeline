module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|jpg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: "http://127.0.0.1:6789"
        }
      },
    ]
  }
}