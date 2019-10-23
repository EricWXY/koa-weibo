const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/post_test', async (ctx, next) => {
  let data = ctx.request.body
  ctx.body = {
    status: 200,
    msg: 'success',
    req: data
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/session_test', async ctx => {
  let session = ctx.session
  if (session.viewNum === null) {
    session.viewNum = 0
  }
  session.viewNum++

  ctx.body = {
    viewNum: session.viewNum ? session.viewNum : 0
  }
})

module.exports = router
