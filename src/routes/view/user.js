const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/auth')

// router.prefix('/users')

/**
 * @description 获取登录信息
 * @param {Object} ctx Koa2上下文
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false //默认未登录
  }
  let userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}

router.get('/login', async ctx => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async ctx => {
  await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginRedirect, async ctx => {
  ctx.session.userInfo.city = ctx.session.userInfo.city == 'null' ? '' : ctx.session.userInfo.city
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router
