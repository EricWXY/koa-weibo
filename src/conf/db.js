/**
 * @description 存储配置
 * @author EricWXY
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  port: 6544,
  user: 'root',
  password: 'root',
  database: 'koa_weibo_db'
}

let MYSQL_POOL = {
  max: 5,    //连接池中最大的连接数量 
  min: 0,    //最小...
  idle: 10000//如果一个连接10s之内没有被使用，则释放 
}

if (isProd) {
  // REDIS_CONF = 
  // MYSQL_CONF =
  // MYSQL_POOL =
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
  MYSQL_POOL,
}