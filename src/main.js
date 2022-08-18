import Vue from 'vue'
import App from './App.vue'
import '@/assembly/Element'
import router from '@/router'
import '@/assets/less/index.less'
import axios from 'axios'
import '@/api/mock'
import store from './store'
import {MessageBox,Message} from 'element-ui';
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$confirm   =MessageBox.confirm
Vue.prototype.$message   =Message

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('username')) {
    if (to.path !== '/login') {
       next('/login' )
    }else next( )
  } next( )
})


new Vue({
  router,
  render: h => h(App),
  store
 }).$mount('#app')