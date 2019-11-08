const userAPIRouter = require('./api/user')
const blogAPIRouter = require('./api/blog')
const utilsAPIRouter = require('./api/utils')
const blogViewRouter = require('./view/blog')
const userViewRouter = require('./view/user')
const errorViewRouter = require('./view/error')

const routers = [
  userAPIRouter,
  blogAPIRouter,
  utilsAPIRouter,
  blogViewRouter,
  userViewRouter,
  errorViewRouter,//404 路由一定要放在最下面
]

module.exports = { routers }
