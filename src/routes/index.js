const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/post_test', async (ctx, next) => {
  let data = ctx.request.body
  ctx.body = {
    status:200,
    msg:'success',
    req:data
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
