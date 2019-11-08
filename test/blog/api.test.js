/**
 * @description blog api test
 * @author EricWXY
 */

const server = require('../server')
const { COOKIE } = require('../config')

let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
  //定义测试内容
  let content = '单元测试自动创建微博_' + Date.now()
  let image = '/xxx.png'

  // 开始测试
  let res = await server
    .post('/api/blog/create')
    .send({
      content,
      image,
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(encodeURIComponent(content))
  expect(res.body.data.image).toBe(image)

  // 记录微博 id
  BLOG_ID = res.body.data.id
})