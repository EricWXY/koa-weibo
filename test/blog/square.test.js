/**
 * @description 广场页 test
 * @author EricWXY
 */

const server = require('../server')
const { COOKIE } = require('../config')

test('广场页加载第一页数据,应该成功', async () => {
  let res = await server
    .get(`/api/square/loadMore/0`)
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)

  let data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('count')
})