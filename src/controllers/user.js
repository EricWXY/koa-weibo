/**
 * @description user controller
 * @author EricWXY
 */

const { getUserInfo, createUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('./_models/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('./_models/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * @description 判断用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * @description 用户注册
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {Number} gender 性别(1:男，2：女，3：保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register,
}