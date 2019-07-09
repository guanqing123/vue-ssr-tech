// path 是 nodejs 里面的一个基本包
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 小于1024 就把图片生成 base64 显示在页面
                            limit: 1024,
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        // 打包时可以区分不同的环境,在这里定义了 process.env 在自己写的js代码中就能取的到
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_DEV: isDev ? '"development"' : '"production"'
            }
        }),
        new htmlWebpackPlugin()
    ]
}

if (isDev){
    //浏览器调试的时候,把编译的es6的语法转成可读的js内容,方便调试
    config.devtool = '#cheap-module-eval-source-map',
    config.devServer = { //webpack2 以后才加入的 devServer
        port: 8000,
        host: '0.0.0.0', //设置这个的好处 我们可以通过localhost,或者内网ip进行访问；如果设置成localhost,通过ip是访问不了的。
        overlay: { //在webpack编译过程中,如果有任何错误,都让它显示到网页上面
            errors: true
        },
        //open: true, //webpack-dev-server 启动的时候默认帮我们打开浏览器
        hot: true, //修改代码,只重新渲染这个组件,不会让整个页面都重新渲染
    }
    config.plugins.push(
        // 热更新的两个插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config;