// 所以关于频道的接口

import request from '@/utils/request'

/**
 * 获取用户自己的频道
 * @returns  Promise
 */
export const getChannelAPI = () => {
  return request({
    url: 'v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: 'v1_0/channels'
  })
}

/**
 *
 * @param {Number|String} id 频道的id
 * @returns Promise
 */
export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'AELETE'
  })
}

/**
 *
 * @param {String|Number} id 新增频道的id
 * @param {*Number} seq 新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
