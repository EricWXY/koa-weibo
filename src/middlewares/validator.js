
/**
 * @description json schema 校验中间件
 * @author EricWXY
 */

const { ErrorModel } = require('../controllers/_models/ResModel')
const { jsonSchemaFileInfo } = require('../controllers/_models/ErrorInfo')

/**
 * @description json schema 校验中间件构造器
 * @param {function} validateFun 验证函数
 */
function genValidator(validateFun) {
  async function validator(ctx, next) {
    let data = ctx.request.body
    let error = validateFun(data)
    // console.log(error)
    if (error) {
      //验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}
