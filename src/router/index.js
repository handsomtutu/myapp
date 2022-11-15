import Vue from 'vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Mall from '../pages/Mall.vue'
import Pageone from '../pages/Pageone.vue'
import Pagetwo from '../pages/Pagetwo.vue'
import Login from '../pages/Login.vue'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        component:Main,
        name:'Main',
        redirect:'/home',
        children:[
            // { path: '/user', component: User, name:'user' },
            // { path: '/home', component: Home, name:'home' },
            // {path: '/mall', component: Mall, name:'mall'},
            // {path: '/page1', component: Pageone, name:'page1'},
            // {path: '/page2', component: Pagetwo, name:'page2'}
        ]
    },
    {
      path:'/login',
      component:Login,
      name:'login'
    }
   
  ]
  export default new VueRouter({
    routes
  })