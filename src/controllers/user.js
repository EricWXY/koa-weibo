/**
 * @description user controller
 * @author EricWXY
 */

const { getUserInfo, createUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('./_models/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('./_models/ErrorInfo')
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

/**
 * @description 登录Controller
 * @param {Object} ctx Koa2 上下文
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login(ctx, userName, password) {
  let userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    //登录失败
    return new ErrorModel(loginFailInfo)
  }
  //登录成功
  ctx.session.userInfo = userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
}