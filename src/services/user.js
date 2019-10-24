/**
 * @description user service
 * @author EricWXY
 */

const User = require('../models/User')
const { formatUser } = require('./_format')

/**
 * @description 获取用户信息
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo(userName, password = undefined) {
  const whereOption = {
    userName
  }
  if (password) {
    Object.assign(whereOption, { password })
  }

  //查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOption
  })

  //未找到
  if (result === null) {
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

module.exports = {
  getUserInfo
}