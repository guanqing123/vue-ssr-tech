import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeCreate () {
    console.log('beforeCreate', this.$el)
  },
  created () {
    console.log('created', this.$el)
  },
  beforeMount () {
    console.log('beforeMount', this.$el)
  },
  mounted () {
    console.log('mounted', this.$el)
  },
  beforeUpdate () {
    console.log('beforeUpdate', this)
  },
  updated () {
    console.log('updated', this)
  },
  activated () { // 在组件章节讲解
    console.log('activated', this)
  },
  deactivated () { // 在组件章节讲解
    console.log('deactivated', this)
  },
  beforeDestroy () {
    console.log('beforeDestroy', this)
  },
  destroyed () {
    console.log('destroyed', this)
  },
  render (h) {
    // throw new TypeError('render error')
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡,并且正式环境可以使用
  }
})

app.$mount('#root')
// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

// setTimeout(() => {
//   app.$destroy()
// }, 1000)
