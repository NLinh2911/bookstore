import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import books from '@/components/books'
import author from '@/components/author'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/books/:id',
      name: 'Books',
      component: books
    },
    {
      path: '/author/:id',
      name: 'Authors',
      component: author
    }
  ]
})
