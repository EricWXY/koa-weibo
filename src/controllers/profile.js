/**
 * @description 个人主页 controller
 * @author EricWXY
 */

const { getBlogListByUser } = require('../services/blog')
const { DEFAULT_PAGE_SIZE } = require('../../conf/constant')
const { SuccessModel } = require('./_models/ResModel')

/**
 * @description 获取个人主页微博列表
 * @param {String} userName 用户名
 * @param {Number} pageIndex 当前页面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  let result = await getBlogListByUser(userName, pageIndex, DEFAULT_PAGE_SIZE)
  let { blogList, count } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: DEFAULT_PAGE_SIZE,
    pageIndex,
    count,
  })
}

module.exports = {
  getProfileBlogList
}