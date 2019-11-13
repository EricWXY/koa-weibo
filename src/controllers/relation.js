/**
 * @description 用户关系 controller
 * @author EricWXY
 */

const { getUsersByFollower, addFollower, delFollower } = require('../services/relation')
const { SuccessModel, ErrorModel } = require('./_models/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('./_models/ErrorInfo')

/**
 * @description 根据用户id 获取粉丝列表
 * @param {Number} userId 用户id
 */
async function getFans(userId) {
  let { count, userList } = await getUsersByFollower(userId)

  return new SuccessModel({
    count,
    fansList: userList
  })
}

/**
 * @description 关注
 * @param {Number} myUserId 当前登录用户Id
 * @param {Number} curUserId 被关注用户Id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  } catch {
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * @description 取消关注
 * @param {Number} myUserId 当前登录用户Id
 * @param {Number} curUserId 取消关注的用户Id
 */
async function unFollow(myUserId, curUserId) {
  let result = await delFollower(myUserId, curUserId)
  if (result)
    return new SuccessModel()
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unFollow,
}