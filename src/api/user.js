// user.js划分是跟后端接口文档
// 请求登录
// 引入request。js
import request from '@/utils/request'

/**
 * 登录
 * @param {string} mobile 手机号
 * @param {number} code 验证码
 * @returns
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机
 * @returns
 */
export const sendCondeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
