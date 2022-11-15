import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
import './api/mock'
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.use(ElementUI);
// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookie.get('token')
  //token 不存在，说明当前用户是未登录，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  render: h => h(App),
}).$mount('#app')
