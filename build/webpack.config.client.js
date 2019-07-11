// path 是 nodejs 里面的一个基本包
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
    // 打包时可以区分不同的环境,在这里定义了 process.env 在自己写的js代码中就能取的到
    new webpack.DefinePlugin({
        'process.env' : {
            NODE_DEV: isDev ? '"development"' : '"production"'
        }
    }),
    new htmlWebpackPlugin()
]

const devServer = { //webpack2 以后才加入的 devServer
    port: 8000,
    host: '0.0.0.0', //设置这个的好处 我们可以通过localhost,或者内网ip进行访问；如果设置成localhost,通过ip是访问不了的。
    overlay: { //在webpack编译过程中,如果有任何错误,都让它显示到网页上面
        errors: true
    },
    //open: true, //webpack-dev-server 启动的时候默认帮我们打开浏览器
    hot: true, //修改代码,只重新渲染这个组件,不会让整个页面都重新渲染
}

let config

if (isDev){
    config = merge(baseConfig, {
        //浏览器调试的时候,把编译的es6的语法转成可读的js内容,方便调试
        devtool: '#cheap-module-eval-source-map',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        // 'css-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                // 开启了 css module 的模式
                                module: true,
                                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true //因为stylus-loader会生成sourceMap,postcss-loader也会生成sourceMap,当stylus-loader生成sourceMap之后,postcss-loader可以直接拿过来用,
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPluins.concat([
            // 热更新的两个插件
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js' //如果这里使用 hash,那么整个应用打包出来的js都是一个hash,如果使用chunkhash,那么会为每一个chunk生成一个hash
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader', //style-loader的作用:其实就是把css-loader处理出来的内容,在外面包裹一层js,这层js代码就是把css代码写到html里面去
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({  //把 vue 单独打包到一个文件,因为业务代码经常变,框架文件不会变
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({ //把 webpack 相关的代码打包到一个单独的文件里面
                name: 'runtime'
            })
        ])
    })
}

module.exports = config;