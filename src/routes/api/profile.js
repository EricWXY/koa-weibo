/**
 * @description 个人主页 API 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/auth')
const { getProfileBlogList } = require('../../controllers/profile')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async ctx => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  let result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router