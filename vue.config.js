// vue.config.js
module.exports = {

  publicPath:"./",
  //去掉map
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'XY笔记'
        return args
      })
  }
}