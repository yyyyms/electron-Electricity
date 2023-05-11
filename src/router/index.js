import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login/'
import Code from '../views/ActivationCode'
Vue.use(VueRouter)


const routes = [
  {
    path:'/',
    name:'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Code',
    name: 'Code',
    component: Code
  },
  
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
