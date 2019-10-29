/**
 * @description 登录验证的中间件
 * @author EricWXY
 */

const { ErrorModel } = require('../controllers/_models/ResModel')
const { loginCheckFailInfo } = require('../controllers/_models/ErrorInfo')

/**
 * @description API 登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * @description 页面登录验证
 * @param {Object} ctx 
 * @param {function} next 
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  // 未登录
  const currentUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(currentUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}