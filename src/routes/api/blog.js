/**
 * @description BlogAPI 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/blog')
const { loginCheck } = require('../../middlewares/auth')
const { genValidator } = require('../../middlewares/validator')
const { create,getHomeBlogList } = require('../../controllers/blog')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create',
  loginCheck,
  genValidator(blogValidate),
  async ctx => {
    let { content, image } = ctx.request.body
    let { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
  })

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)  // 转换 number 类型
  const { id: userId } = ctx.session.userInfo
  const result = await getHomeBlogList(userId, pageIndex)
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
