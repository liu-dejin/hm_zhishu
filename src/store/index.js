import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  // state 存放 mutation 修改 getter 获取 action 异步 module 分模块
  // 组合模块的配置项
  modules: {
    user
  }
})

export default store
