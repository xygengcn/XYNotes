// vue.config.js
module.exports = {

  publicPath:"./",
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
  }
}