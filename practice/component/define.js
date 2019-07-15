import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
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
  methods: {
    handleChange () {
      this.onChange()
    }
  }
}

const component2 = {
  props: {
    propTwo: {
      type: String,
      required: true,
      validator (value) {
        return typeof value === 'boolean'
      }
    }
  },
  template: `
    <div>
      <span @click="handleChange">{{propTwo}}</span>
    </div>
  `,
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component) 全局注册组件

new Vue({
  components: {
    CompOne: component,
    CompTwo: component2
  },
  data: {
    prop1: 'text1',
    prop2: 'text2'
  },
  methods: {
    handleChange () {
      this.prop1 += 1
    },
    handle2Change () {
      this.prop2 += 2
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `
    <div>
      <comp-one ref="comp1" :active="true" :prop-one="prop1" :on-change="handleChange"></comp-one>
      <comp-one :active="false" :propOne="prop1" :on-change="handleChange"></comp-one>
      <comp-two :prop-two="prop2" @change="handle2Change"></comp-two>
    </div>
  `
})
