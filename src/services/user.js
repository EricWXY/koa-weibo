/**
 * @description user service
 * @author EricWXY
 */

const User = require('../models/User')
const { formatUser } = require('./_format')
const { addFollower } = require('./relation')

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

  let data = result.dataValues

  // 自己关注自己 (方便首页获取数据)
  addFollower(data.id, data.id)

  return data
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

/**
 * @description 更新用户信息
 * @param {Object} param0 要修改的内容  (newPassword, newNickName, newCity, newPicture)
 * @param {Object} param1 查询条件 (userName, password )
 */
async function updateUser(
  { newPassword, newNickName, newCity, newPicture },
  { userName, password }
) {
  //拼接修改内容
  let updateData = {}
  if (newPassword)
    updateData.password = newPassword
  if (newNickName)
    updateData.nickName = newNickName
  if (newCity)
    updateData.city = newCity
  if (newPicture)
    updateData.picture = newPicture

  //拼接查询条件
  let whereData = {
    userName
  }
  if (password)
    whereData.password = password

  //执行修改
  let result = await User.update(updateData, { where: whereData })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
