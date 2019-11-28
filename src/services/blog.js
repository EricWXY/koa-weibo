/**
 * @description 微博service
 * @author EricWXY
 */

const { Blog, User, UserRelation } = require('../models')
const { formatUser, formatBlog } = require('./_format')

/**
 * @description 创建微博
 * @param {Object} param0 创建微博所需数据{userId,content,image}
 */
async function createBlog({ userId, content, image }) {
  let result = await Blog.create({
    userId,
    content,
    image,
  })
  return result.dataValues
}

/**
 * @description 根据用户获取微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 页索引
 * @param {Number} pageSize 页大小
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  let userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  //执行查询
  let result = await Blog.findAndCountAll({
    limit: pageSize,             //每页多少条
    offset: pageSize * pageIndex,//跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts,
      }
    ],
  })

  // result.count 是总数，跟分页无关
  // result.rows 是查询结果 Array

  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(item => {
    let user = item.user.dataValues
    item.user = formatUser(user)
    item.content = decodeURIComponent(item.content)
    item.user.nickName = decodeURIComponent(item.user.nickName)
    return item
  })

  return {
    count: result.count,
    blogList
  }
}

/**
 * @description 获取关注者的微博列表（首页）
 * @param {Number} userId 用户Id
 * @param {Number} pageIndex 页数
 * @param {Number} pageSize 页大小
 */
async function getFollowerBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  let result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  })

  // 格式化数据
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(item => {
    item.user = formatUser(item.user.dataValues)
    return item
  })

  return {
    count:result.count,
    blogList,
  }

}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowerBlogList,
}
