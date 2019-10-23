/**
 * @description 存储配置
 * @author EricWXY
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port:6379,
  host:'127.0.0.1'
}

if(isProd){
  REDIS_CONF = {
    port:0000,
    host:''
  }
}

module.exports = {
  REDIS_CONF
}