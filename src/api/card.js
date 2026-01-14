import request from '@/utils/request'

/**
 * 获取月卡列表
 * @param {*} params  查询参数
 * @returns
 */
export const getCarListApi = (params) => request('parking/card/list', 'GET', params)
