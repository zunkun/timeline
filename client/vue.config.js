module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tl-web/': './',
  outputDir: 'tl-web',
  devServer: {
    port: 5000,
    proxy: {
      '/tl-web/api': {
        target: 'http://[::1]:4000/',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/tl-img/img': {
        target: 'http://127.0.0.1:6789/',
        pathRewrite: {'^/tl-img/img' : ''}
      },
      '/images': {
        target: 'http://[::1]:4000/',
        secure: false,
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/images' : '/images'}
      }
    }
  }
}