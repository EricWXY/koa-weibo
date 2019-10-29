const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/auth')

const userAPIRouter = require('./api/user')
const userViewRouter = require('./view/user')
const errorViewRouter = require('./view/error')

router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/post_test', async ctx => {
  let data = ctx.request.body
  ctx.body = {
    status: 200,
    msg: 'success',
    req: data
  }
})

router.get('/json', loginCheck, async ctx => {
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

const routers = [
  userAPIRouter,
  userViewRouter,
  errorViewRouter,//404 路由一定要放在最下面
]

module.exports = { router, routers }
