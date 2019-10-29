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
  let whereOption = {
    userName
  }
  if (password) {
    Object.assign(whereOption, { password })
  }

  //查询
  let result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOption
  })

  //未找到
  if (result === null) {
    return result
  }

  // 格式化
  let formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 * @description 创建用户
 * @param {Object} userInfo 用户信息
 */
async function createUser(userInfo) {
  let { userName, password, gender = 3, nickName } = userInfo
  let result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  })
  return result.dataValues
}

/**
 * @description 删除用户
 * @param {String} userName 用户名
 */
async function deleteUser(userName) {
  let res = await User.destroy({
    where: {
      userName
    }
  })
  // res 删除的行数
  return res > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}