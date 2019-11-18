/**
 * @description 用户关系 service
 * @author EricWXY
 */

const { User, UserRelation } = require('../models')
const { formatUser } = require('./_format')

/**
 * @description 获取关注该用户的用户列表，即用户粉丝
 * @param {Number} followerId 被关注人id
 */
async function getUsersByFollower(followerId) {
  let result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: UserRelation,
      where: {
        followerId
      }
    }]
  })

  // result.count 总数
  // result.rows 查询结果 ，数组
  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

/**
 * @description 获取关注人列表
 * @param {Number} userId 用户Id
 */
async function getFollowerByUser(userId) {
  let result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: User,
      attributes: ['id', 'userName', 'nickName', 'picture'],
    }],
    where: {
      userId
    }
  })

  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    return user
  })

  return {
    count: result.count,
    userList,
  }
}

/**
 * @description 添加关注关系
 * @param {Number} userId 用户Id
 * @param {Number} followerId 被关注用户Id
 */
async function addFollower(userId, followerId) {
  let result = await UserRelation.create({
    userId,
    followerId,
  })
  return result.dataValues
}

/**
 * @description 删除关注关系
 * @param {Number} userId 用户Id
 * @param {Number} followerId 被删除关注关系的用户Id
 */
async function delFollower(userId, followerId) {
  let result = await UserRelation.destroy({
    where: {
      userId,
      followerId,
    }
  })
  return result > 0
}

module.exports = {
  getUsersByFollower,
  getFollowerByUser,
  addFollower,
  delFollower,
}
