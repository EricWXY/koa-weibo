/**
 * @description 微博view 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/auth')

//首页
router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {})
})

module.exports = router