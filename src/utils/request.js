import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  // 基地址
  baseURL: 'https://api-hmzs.itheima.net/api',
  // 超时时间
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 配置请求头携带token
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 请求报错处理
    return Promise.reject(error)
  }
)

// 响应拦截器
// 返回数据流转第一站 响应拦截器
service.interceptors.response.use(
  response => {
    // 响应成功 2xx 解包data 拿到原始数据
    return response.data
  },
  error => {
    // 响应失败 3xx 4xx 5xx
    // error 错误信息
    // 统一错误处理

    // 401 token失效 滑动过期
    if (error.response.status === 401) {
      // 清除token
      store.commit('user/removeToken')
      // 跳转登录页
      router.push(`/login`)
    } else {
      Message.error(error.response.data.msg ?? '请求失败')
    }
    return Promise.reject(error)
  }
)

/**
 * 请求工具函数
 * @param {string} url - 接口地址
 * @param {string} method - 请求方式 (GET, POST, 等)
 * @param {object} submitData - 发送的数据
 */
const request = (url, method = 'GET', submitData) => {
  return service.request({
    url,
    method,
    // 如果是 GET 请求，数据放在 params (查询字符串)
    // 否则放在 data (请求体)
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export default request
