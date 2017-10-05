import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/components/homepage'
import books from '@/components/books'
import author from '@/components/author'
import category from '@/components/category'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/page/:id',
      name: 'Page',
      component: homepage
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
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: category
    },
    {
      path: '/category/:topCategory/:subcategory',
      name: 'Subcategory',
      component: category
    }
  ]
})
