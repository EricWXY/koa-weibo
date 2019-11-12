/**
 * @description 用户关系 controller
 * @author EricWXY
 */

const { getUsersByFollower } = require('../services/relation')
const { SuccessModel } = require('./_models/ResModel')

/**
 * @description 根据用户id 获取粉丝列表
 * @param {Number} userId 用户id
 */
async function getFans(userId) {
  let { count, userList } = await getUsersByFollower(userId)
 
  return new SuccessModel({
    count,
    fansList:userList
  })
}

module.exports = {
  getFans,
}