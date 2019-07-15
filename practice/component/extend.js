import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    // propOne: { demo1
    //   required: true
    // }
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text"/>
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
    `,
  data () {
    return {
      text: 0
    }
  },
  mounted () {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// demo1
// const CompVue = Vue.extend(component)
//
// new CompVue({
//   el: '#root',
//   propsData: {
//     propOne: 'xxx'
//   },
//   data: {
//     text: '123'
//   },
//   mounted () {
//     console.log('instance mounted')
//   }
// })

// demo2
const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    }
  },
  mounted () {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name)
  }
}

new Vue({
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp></comp>`
})
