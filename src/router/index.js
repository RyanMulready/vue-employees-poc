import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

const routes = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/login',
    name: 'login',
    component: load('global/login')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true
    },
    component: load('global/home')
  },
  {
    path: '/employees',
    name: 'employeesGrid',
    meta: {
      requiresAuth: true
    },
    component: load('employees/grid')
  },
  {
    path: '/employees/item/:id',
    name: 'employeesItem',
    meta: {
      requiresAuth: true
    },
    component: load('employees/item')
  },
  {
    path: '/account/info',
    name: 'accountInfo',
    meta: {
      requiresAuth: true
    },
    component: load('account/info')
  },
  {
    path: '*',
    component: load('global/404')
  } // Not found
  ]
})

routes.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user.authenticated) {
    next({ path: '/login' })
  }
  else {
    next()
  }
})

export default routes
