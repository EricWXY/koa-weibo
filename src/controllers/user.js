/**
 * @description user controller
 * @author EricWXY
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('./_models/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require('./_models/ErrorInfo')
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

/**
 * @description 删除当前用户
 * @param {String} userName 
 */
async function deleteCurUser(userName) {
  let result = await deleteUser(userName)
  if (result) {
    //成功
    return new SuccessModel()
  }
  //失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * @discription 修改个人信息
 * @param {Object} ctx 
 * @param {String} nickName 昵称
 * @param {String} city 城市
 * @param {String} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  let { userName } = ctx.session.userInfo
  if (!nickName)
    nickName = userName
  let res = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture,
  }, { userName })
  if (res) {
    //执行成功
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  //执行失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * @description 修改密码
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
  let result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) }
  )
  if (result) {
    //执行成功
    return new SuccessModel()
  }

  //执行失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * @description 退出登录
 * @param {Object} ctx 
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
}