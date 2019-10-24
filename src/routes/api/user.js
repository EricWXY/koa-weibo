/**
 * @description user api 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { isExist } = require('../../controllers/user')

router.prefix('/api/user')

// 用户注册
router.post('/register', async ctx => {

})

// 判断用户名是否存在
router.post('/isExist', async ctx => {
  let { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 用户登录
router.post('/login', async ctx => {

})

module.exports = router