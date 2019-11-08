/**
 * @description 微博数据模型单元测试
 * @author EricWXY
 */

const { Blog } = require('../../src/models')

test('Blog 模型的各个属性，符合预取', () => {
  // build 会构建一个内存的 Blog 实例，但不会提交到数据库
  let blog = Blog.build({
    userId:1,
    content:'微博内容',
    image:'/test.png'
  })
  
  // 验证各种属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容')
  expect(blog.image).toBe('/test.png')

})