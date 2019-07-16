import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id', // /app/xxx
    // props: true,
    // props: (route) => ({ id: route.query.b }), // http://127.0.0.1:8000/app/123?a=123&b=456
    path: '/app',
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdasd'
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
    component: Login
  }
]
