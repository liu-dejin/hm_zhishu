import { loginAPI } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export default {
  namespaced: true,
  state() {
    return {
      token: getToken() ?? ''
    }
  },
  mutations: {
    // mutations的方法只有一种调用方式 store.commit('mutations方法名', 载荷)  并没有方法名()这种调用方式
    setToken(state, NewToken) {
      state.token = NewToken
      setToken(NewToken)
    },
    removeToken(state) {
      state.token = ''
      removeToken()
    }
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  actions: {
    async doLogin({ commit }, { username, password }) {
      const res = await loginAPI({ username, password })
      commit('setToken', res.data.token)
      setToken(res.data.token)
    }
  }
}
