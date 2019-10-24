/**
 * @description 加密方法
 * @author EricWXY
 */

const crypto = require('crypto')
const { CRYPTO_KEY } = require('../../conf/keys')

/**
 * @description MD5加密
 * @param {String} content 明文
 */
const _md5 = content => {
  const hash = crypto.createHash('md5')
  return hash.update(content).digest('hex')
}

/**
 * @description 加密方法
 * @param {String} content 明文
 */
function doCrypto(content) {
  const str = `pwd=${content}&key=${CRYPTO_KEY}`
  return _md5(str)
}

module.exports = doCrypto