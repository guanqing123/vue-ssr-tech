import Vue from 'vue'

// demo1
// const component = {
//   props: ['value'],
//   template: `
//     <div>
//       <input type="text" @input="handleInput" :value="value" />
//     </div>
//   `,
//   methods: {
//     handleInput (e) {
//       this.$emit('input', e.target.value)
//     }
//   }
// }

// demo2
const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1" />
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  template: `
    <div>
      <!--<comp-one :value="value" @input="handleInput"></comp-one>-->
      <!--<comp-one :value="value" @input="value = arguments[0]"></comp-one>-->
      <!--v-model 就是相当于给我们添加一个 value属性和处理了 @input事件监听 -->
      <comp-one v-model="value"></comp-one>
    </div>
  `,
  methods: {
    handleInput (e) {
      this.value = e
      console.log(arguments)
    }
  }
})
