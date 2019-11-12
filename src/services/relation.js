/**
 * @description 用户关系 service
 * @author EricWXY
 */

const { User, UserRelation } = require('../models')
const { formatUser } = require('./_format')

/**
 * @description 获取关注该用户的用户列表，即用户粉丝
 * @param {Number} folowerId 被关注人id
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
    count:result.count,
    userList,
  }
}

module.exports = {
  getUsersByFollower,
}