// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
    return {
        // .vue 文件 去空格
        preserveWhiteSpace: true,
        // 把 .vue文件 里面的css也输出到 单独的一个css文件里面去
        extractCSS: !isDev,
        cssModules: {},
        // 关闭热重载 css还是可以热重载,因为css的热重载是 vue-style-loader处理了.修改 template 内容,发现页面需要刷新,这个配置起作用了
        // hotReload: true  这个可以不用配置,根据环境变量生成
        // loaders: {
        //     // 自定义 loader
        //     'docs' : docsLoader
        // },
        // preLoader: {
        //
        // },
        // postLoader: {
        //
        // }
    }
}