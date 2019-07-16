// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id', // /app/xxx
    props: true,
    // props: (route) => ({ id: route.query.b }), // http://127.0.0.1:8000/app/123?a=123&b=456
    // path: '/app',
    // component: Todo,
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdasd'
    },
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
