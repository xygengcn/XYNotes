// vue.config.js
module.exports = {

  publicPath: "./",
  //去掉map
  productionSourceMap: false,
  // devServer: {
  //   host: '172.20.10.4',
  //   port:8080
  // },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'XY笔记'
        return args
      })
  },
  pwa: {
    name: 'XY笔记',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'while',
    manifestPath:'manifest.json',
    iconPaths: {
      favicon32: './img/logo-32.png',
      favicon16: './img/logo-16.png',
      appleTouchIcon: './img/logo-72.png',
      maskIcon: './img/logo-72.png',
      msTileImage: './img/logo-72.png'
    },
    workboxOptions: {
      skipWaiting: true
    }
  }
}