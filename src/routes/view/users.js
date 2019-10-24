const router = require('koa-router')()

// router.prefix('/users')

router.get('/login',async ctx => {
  await ctx.render('login')
})

router.get('/register',async ctx => {
  await ctx.render('register')
})

module.exports = router
