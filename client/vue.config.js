module.exports = {
  devServer: {
    port: 5000,
    proxy: {
      '/tl/api': {
        target: 'http://[::1]:4000/api',
        secure: false,
        ws: true
      }
    }
  }
}