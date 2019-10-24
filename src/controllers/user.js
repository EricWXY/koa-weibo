/**
 * @description user controller
 * @author EricWXY
 */

const { getUserInfo } = require('../services/user')
const { ErrorModel, SuccessModel } = require('./_models/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo } = require('./_models/ErrorInfo')

/**
 * @description 判断用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  console.log(userInfo)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}