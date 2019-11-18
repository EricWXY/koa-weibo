/**
 * @description json schema 校验
 * @author EricWXY
 */

const Ajv = require('ajv') // another json schema validator
const ajv = new Ajv({
  // allErrors: true // 输出所有错误（比较慢）
})


/**
 * @description json schema 校验函数
 * @param {Object} schema json schama 规则
 * @param {Object} data 待校验的数据
 */
function validate(schema, data = {}) {
  let valid = ajv.validate(schema, data)
  if (!valid)
    return ajv.errors[0]
}

module.exports = validate
