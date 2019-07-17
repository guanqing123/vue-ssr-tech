<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <!--<router-link :to="{name: 'app'}">app</router-link>-->
        <!--<router-link to="/app/123">app</router-link>-->
        <!--<p>{{count}}</p>-->
        <p>{{counter}}</p>
        <p>{{fullName}}</p>
        <router-link to="/slide">slide</router-link>
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <!--<Todo></Todo>-->
        <transition name="fade">
          <router-view />
        </transition>
        <Footer></Footer>
        <!--<router-view name="a" />-->
    </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'

// import Todo from './views/todo/todo.vue'
// console.log(Header.__docs)
export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // console.log(this.$route)
    console.log(this.$store)
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    // this.$store.state.count = 3 可以改成功,但不建议这么改 strict: isDev 规范数据操作
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    let i = 1
    setInterval(() => {
      this.updateCount({
        num: i++,
        num2: 2
      })
    }, 1000)
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
  },
  computed: {
    // ...mapState(['count']),
    ...mapState({
      // counter: 'count'
      counter: (state) => state.count
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>
