module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tasks/': './',
  outputDir: 'tasks',
  devServer: {
    port: 5800,
    proxy: {
      '/tasks/api': {
        target: 'http://[::1]:4000/',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/api': {
        target: 'http://[::1]:4000/',
        secure: false,
        ws: true,
        changeOrigin: true,
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