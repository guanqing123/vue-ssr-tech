import Vue from 'vue'

var globalVar = '111' // eslint-disable-line

new Vue({
  el: '#root',
  template: `
    <!--<div v-bind:id="aaa" v-on:click="handleClick">-->
      <!--{{isActive ? 'active' : 'not active'}}-->
      <!--{{arr.join(' ')}}-->
      <!--{{Date.now()}}-->
      <!--{{globalVar}} // 访问不到-->
      <!--{{html}}-->
      <!--<p v-html="html"></p>-->
    <!--</div>-->
    <!--<div :class="{ active: !isActive }">-->
    <!--<div :class="[isActive ? 'active' : '']">-->
    <div 
      :class="[{ active: isActive}]"
      :style="[styles, styles2]"
      >
      <p v-html="html"></p>
      <p>{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none' // 消除浏览器默认的样式,自动帮我们加前缀
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
