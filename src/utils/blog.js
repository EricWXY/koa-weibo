/**
 * @description 微博数据相关的工具方法
 * @author EricWXY
 */

const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * @description 更具blogList渲染除html字符串
 * @param {Array} blogList 微博列表
 * @param {Boolean} canReply 是否可以回复
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, { blogList, canReply })
}

module.exports = {
  getBlogListStr,
}
