// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
    return {
        // .vue 文件 去空格
        preserveWhiteSpace: true,
        // 把 .vue文件 里面的css也输出到 单独的一个css文件里面去
        extractCSS: !isDev,
        cssModules: {
            // 定义 css 名称
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            // 会把 css 里面 中间 横杆(-) 的连接方式,转换成 js 里面调用变量的 camelCase 的方式(驼峰)
            camelCase: true
        },
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