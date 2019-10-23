/**
 * @description sequelize 实例
 * @author EricWXY
 */

const Sequelize = require('sequelize')
const { isProd, isTest } = require('../utils/env')
const { MYSQL_CONF, MYSQL_POOL } = require('../conf/db')
const { host, port, user, password, database } = MYSQL_CONF

const conf = {
  host,
  port,
  dialect: 'mysql'
}

if (isTest) {
  conf.logging = () => { }//测试环境不打印SQL语句
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = MYSQL_POOL
}

const seq = new Sequelize(
  database,
  user,
  password,
  conf
)

module.exports = seq