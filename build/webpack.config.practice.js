// path 是 nodejs 里面的一个基本包
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader') //webpack4
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPluins = [
  // 打包时可以区分不同的环境,在这里定义了 process.env 在自己写的js代码中就能取的到
  new webpack.DefinePlugin({
    'process.env' : {
      NODE_DEV: '"development"'
    }
  }),
  new htmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueLoaderPlugin() // webpack4 新增
]

const devServer = { //webpack2 以后才加入的 devServer
  port: 8080,
  host: '0.0.0.0', //设置这个的好处 我们可以通过localhost,或者内网ip进行访问；如果设置成localhost,通过ip是访问不了的。
  overlay: { //在webpack编译过程中,如果有任何错误,都让它显示到网页上面
    errors: true
  },
  //open: true, //webpack-dev-server 启动的时候默认帮我们打开浏览器
  hot: true, //修改代码,只重新渲染这个组件,不会让整个页面都重新渲染
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname,'../practice/index.js'),
  //浏览器调试的时候,把编译的es6的语法转成可读的js内容,方便调试 webpack4 可以不用设置
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',
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
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue' : path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPluins.concat([
    // 热更新的两个插件
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoEmitOnErrorsPlugin()  webpack4已经取消掉了
  ])
})

module.exports = config;
