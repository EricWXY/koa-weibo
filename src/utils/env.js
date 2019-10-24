/**
 * @description 环境变量
 * @author EricWXY
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  isProd: ENV === 'production',
  isTest: ENV === 'test',
}