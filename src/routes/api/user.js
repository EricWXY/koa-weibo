/**
 * @description user api 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controllers/user')
const { genValidator } = require('../../middlewares/validator')
const userValidate = require('../../validator/user')


router.prefix('/api/user')

// 用户注册
router.post('/register', genValidator(userValidate), async ctx => {
  ctx.body = await register(ctx.request.body)
})

// 判断用户名是否存在
router.post('/isExist', async ctx => {
  let { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 用户登录
router.post('/login', async ctx => {
  let { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

module.exports = router