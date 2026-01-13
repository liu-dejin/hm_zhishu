// request 封装axios 创建出的实例
import request from '@/utils/request'

// 登录函数
/**
 * @description: 登录函数
 * @param {*} data { mobile,password}
 * @return {*} promise
 */
export const loginAPI = (data) => request('/park/login', 'POST', data)
