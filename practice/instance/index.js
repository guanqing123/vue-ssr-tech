import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }// ,
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')

setInterval(() => {
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  app.text += 1
  // 修改 text 的值,并不是每次修改就去渲染dom的,其实是异步队列来做的。（如果修改了值,没有刷新,了解一下vm.$nextTick）
  // app.$options.data.text += 1 没有修改 data 的值。说明$options上的data是经过处理的,并不是直接的 data
  // app.$data.text += 1 修改了 data 的值
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// 等到下一次渲染的时候就会起作用 替换掉了 text
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root === app, app.$root)
// <item><div></div>/item>
// console.log(app.$children);
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText} : ${oldText}`)
// })
// setTimeout(() => {
//   unWatch() 需要手动释放监听
// }, 2000)

// app.$on('test', (a, b) => {
//   console.log(`test emited ${1} ${b}`)
// })
// app.$emit('test', 1, 2)

// app.$once('once', (a, b) => {
//   console.log(`once emited ${a} ${b}`)
// })
// setInterval(() => {
//   app.$emit('once', 1, 2)
// }, 1000)

// let i = 0
// setInterval(() => {
//   i++
//   // vue是一个响应式的框架,当data里面申明一个obj，没有任何属性,后面修改 obj.a 时，这个 a就不是响应式的,所以a的值的修改,不会引起页面的刷新
//   app.obj.a = i
//   // 强制组件进行渲染
//   app.$forceUpdate()
// }, 1000)

// let i = 0
// setInterval(() => {
//   i++
//   // 通过这张方式赋值,会把a补成响应式的,不需要强制渲染
//   app.$set(app.obj, 'a', i)
//   // app.$delete 可以彻底删掉 响应式
// }, 1000)
