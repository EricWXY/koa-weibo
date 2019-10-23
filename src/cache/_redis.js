/**
 * @module my/redis
 * @description 链接 redistribution的方法 get set
 * @author EricWXY
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error:', err)
})

/**
 * @name redisSet
 * @param {String} key 关键字
 * @param {String} val 值
 * @param {Number} timeout 过期时间，单位 s
 */
const set = (key, val, timeout = 60 * 60) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 * @name redisGet 
 * @param {String} key 关键字
 */
const get = key => new Promise((resolve, reject) => {
  redisClient.get(key, (err, val) => {
    if (err) {
      reject(err)
      return
    }
    if (val === null) {
      resolve(null)
      return
    }
    try {
      resolve(
        JSON.parse(val)
      )
    } catch  {
      resolve(val)
    }
  })
})

module.exports = {
  set, get
}