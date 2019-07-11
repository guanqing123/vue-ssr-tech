// path 是 nodejs 里面的一个基本包
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
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
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true //因为stylus-loader会生成sourceMap,postcss-loader也会生成sourceMap,当stylus-loader生成sourceMap之后,postcss-loader可以直接拿过来用,
                }
            },
            'stylus-loader'
        ]
    }),
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
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js' //如果这里使用 hash,那么整个应用打包出来的js都是一个hash,如果使用chunkhash,那么会为每一个chunk生成一个hash
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader', //style-loader的作用:其实就是把css-loader处理出来的内容,在外面包裹一层js,这层js代码就是把css代码写到html里面去
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
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({  //把 vue 单独打包到一个文件,因为业务代码经常变,框架文件不会变
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({ //把 webpack 相关的代码打包到一个单独的文件里面
            name: 'runtime'
        })
    )
}

module.exports = config;