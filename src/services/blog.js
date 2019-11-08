/**
 * @description 微博service
 * @author EricWXY
 */

const { Blog } = require('../models')

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

module.exports = {
  createBlog
}