import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // 基地址
  baseURL: 'https://api-hmzs.itheima.net/v1',
  // 超时时间
  timeout: 30000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 配置请求头携带token
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
    return Promise.reject(error)
  }
)

export default service
