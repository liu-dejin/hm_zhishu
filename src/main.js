import Vue from 'vue'
// 从node_modules引入
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局引入scss文件
import '@/styles/index.scss' // global css

// 引入App组件
import App from './App'

// 引入store
import store from './store'

// 引入router
import router from './router'

// 注册svg
import '@/icons'

// 将ElementUI注册为全局组件
Vue.use(ElementUI)

// 关闭生产环境提示
Vue.config.productionTip = false

// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
