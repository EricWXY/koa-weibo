const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

// router
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// config
const { SESSION_KEY } = require('./conf/common')
const { REDIS_CONF } = require('./conf/db')
const { isTest, isProd } = require('./utils/env')

// error handler
let onErrorConf = {}
if (isProd)
  onErrorConf = {
    redirect: '/error'
  }

onerror(app, onErrorConf)


// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

if (!isTest)//单元测试时不打印log
  app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = [SESSION_KEY]
app.use(session({
  key: 'weibo.sid',             // cookie name (default:'koa.sid')
  prefix: 'weibo.sess:',        // redis key 的前缀 (default:'koa:sess:')
  cookie: {
    path: '/',
    httpOnly: true,             //很关键的一个配置（只允许服务端修改cookie）
    maxAge: 24 * 60 * 60 * 1000 //过期时间（ms)
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())//404路由一定要注册在最下面

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
