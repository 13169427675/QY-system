import Vue from 'vue'
import App from './App.vue'
import store from "./store/store"
import "../src/assets/css/public.css"
import "normalize.css"
import "./assets/font/iconfont.css"
import router from "./router/router.js"
import ElementUI from "element-ui"
import "../node_modules/element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
