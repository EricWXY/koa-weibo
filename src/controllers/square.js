/**
 * @description 广场页 controller
 * @author EricWXY
 */

const { DEFAULT_PAGE_SIZE } = require('../../conf/constant')
const { SuccessModel } = require('./_models/ResModel')
const { getSquareCacheList } = require('../cache/blog')

/**
 * @description 获取广场页的微博列表
 * @param {Number} pageIndex 页数
 */
async function getSquareBlogList(pageIndex = 0) {
  let result = await getSquareCacheList(pageIndex, DEFAULT_PAGE_SIZE)
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
  getSquareBlogList,
}