/**
 * @description 数据格式化
 * @author EricWXY
 */

const { USER_DEFAULT_PICTURE } = require('../../conf/constant')

/**
 * @description 格式化用户默认头像
 * @param {Object} obj 用户信息对象
 */
const _formatUserDefaultPicture = obj => {
  if (obj.picture == null)
    obj.picture = USER_DEFAULT_PICTURE
  return obj
}

/**
 * @description 格式化用户信息
 * @param {Array|Object} param 用户列表或单个用户对象
 */
function formatUser(param) {
  if (param === null) {
    return param
  }

  if (param instanceof Array) {
    return param.map(_formatUserDefaultPicture)
  }

  return _formatUserDefaultPicture(param)
}

module.exports = {
  formatUser
}