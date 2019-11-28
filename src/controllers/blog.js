/**
 * @description blog controller
 * @author EricWXY
 */

const xss = require('xss')
const { createBlog, getFollowerBlogList } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('./_models/ResModel')
const { createBlogFailInfo } = require('./_models/ErrorInfo')
const { DEFAULT_PAGE_SIZE } = require('../../conf/constant')

/**
 * @description 创建微博
 * @param {Object} param0 创建微博所需的数据{userId,content,image}
 */
async function create({ userId, content, image }) {
  try {
    let blog = await createBlog({
      userId,
      content: encodeURIComponent(xss(content)),
      image,
    })
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * @description 获取首页微博列表
 * @param {Number} userId 用户id
 * @param {Number} pageIndex 页数
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  let result = await getFollowerBlogList({ userId, pageIndex, pageSize: DEFAULT_PAGE_SIZE })
  let { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length ===0,
    blogList,
    pageSize:DEFAULT_PAGE_SIZE,
    pageIndex,
    count,
  })
}

module.exports = {
  create,
  getHomeBlogList,
}
