/**
 * @description 广场页 API 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/auth')
const { getSquareBlogList } = require('../../controllers/square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async ctx => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  let result = await getSquareBlogList(pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router