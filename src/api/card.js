import request from '@/utils/request'

/**
 * 获取月卡列表
 * @param {*} params  查询参数
 * @returns
 */
export const getCarListApi = (params) => request('parking/card/list', 'GET', params)
/**
 * 新增月卡
 * @param {*} params  新增参数
 * @returns
 */
export const addCarCardApi = (params) => request('/parking/card', 'POST', params)
/**
 * 获取月卡详情
 * @param {*} id  月卡id
 * @returns
 */
export const getCarCardDetailApi = (id) => request(`/parking/card/detail/${id}`, 'GET')
/**
 * 更新月卡
 * @param {*} data  更新参数
 * @returns
 */
export const updateCarCardApi = (data) => request('/parking/card/edit', 'PUT', data)
/**
 * 删除月卡
 * @param {*} id  月卡id
 * @returns
 */
export const deleteCarCardApi = (ids) => request(`/parking/card/${ids}`, 'DELETE')
