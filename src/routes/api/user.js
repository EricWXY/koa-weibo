/**
 * @description user api 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, changeInfo } = require('../../controllers/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/auth')
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

// 删除
router.post('/del', loginCheck, async ctx => {
  if (isTest) {
    // 测试环境下， 测试账号登录之后，删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})

//修改个人信息
router.patch('/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async ctx => {
    let { nickName, city, picture } = ctx.request.body
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  })

module.exports = router