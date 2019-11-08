/**
 * @description BlogAPI 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/auth')
// const { genValidator} = require('../../middlewares/validator')
const { create } = require('../../controllers/blog')

router.prefix('/api/blog')

// 创建微博
router.post('/create', loginCheck, async ctx => {
  let { content, image } = ctx.request.body
  let { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

module.exports = router