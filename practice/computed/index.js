import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <span>Name: {{name}}</span><br/>
      <span>Name: {{getName()}}</span><br/>
      <span>Number: {{number}}</span><br/>
      <span>FullName: {{fullName}}</span><br/>
      <span><input type="text" v-model="number" /></span><br/>
      <span>firstName: <input type="text" v-model="firstName" /></span><br/>
      <span>lastName: <input type="text" v-model="lastName" /></span><br/>
      <span>name: <input type="text" v-model="name" /></span><br/>
      <span>Obj.a: <input type="text" v-model="obj.a" /></span>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  computed: {
    // name () {
    //   console.log('new name')
    //   // return this.firstName + ' ' + this.lastName
    //   return `${this.firstName} ${this.lastName}`
    // }
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  watch: {
    // firstName (newName, oldName) {
    //   this.fullName = newName + ' ' + this.lastName
    // },
    // lastName (newName, oldName) {
    //   this.fullName = this.firstName + ' ' + newName
    // }
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      immediate: true
    },
    // obj: {
    //   handler (newName, oldName) {
    //     console.log('obj.a changed')
    //   },
    //   immediate: true,
    //   deep: true // 深入观察 obj 的任一个属性修改,都触发 handler,如果不加,只有 obj 整体修改的时候，才触发
    // },
    'obj.a': {
      handler (newName, oldName) {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return `${this.firstName} ${this.lastName}`
    }
  },
  mounted () {
    this.obj = { // 不加deep,obj修改的时候才会触发 obj handler
      a: '345'
    }
  }
})
