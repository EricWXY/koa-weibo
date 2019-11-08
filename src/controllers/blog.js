/**
 * @description blog controller
 * @author EricWXY
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('./_models/ResModel')
const { createBlogFailInfo } = require('./_models/ErrorInfo')

/**
 * @description 创建微博
 * @param {Object} param0 创建微博所需的数据{userId,content,image}
 */
async function create({ userId, content, image }) {
  try {
    let blog = await createBlog({
      userId,
      content:encodeURIComponent(content),
      image,
    })
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}