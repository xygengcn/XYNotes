// vue.config.js
module.exports = {

    publicPath: "./",
    //去掉map
    productionSourceMap: false,
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'XY笔记'
                return args
            })
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "~@/assets/style/master.scss";'
            }
        }

    },
    pwa: {
        name: 'XY笔记',
        themeColor: '#333333',
        msTileColor: '#333333',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#333333',
        manifestPath: 'manifest.json',
        iconPaths: {
            favicon32: './img/logo-32.png',
            favicon16: './img/logo-16.png',
            appleTouchIcon: './img/logo-256.png',
            maskIcon: './img/logo-256.png',
            msTileImage: './img/logo-256.png'
        },
        workboxOptions: {
            skipWaiting: true
        }
    }
}