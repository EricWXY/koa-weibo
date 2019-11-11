/**
 * @description 微博view 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/auth')
const { getProfileBlogList } = require('../../controllers/profile')
const { getSquareBlogList } = require('../../controllers/square')

// 首页
router.get('/', loginRedirect, async ctx => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async ctx => {
  let { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async ctx => {
  // 获取微博第一页数据
  let { data: blogData } = await getProfileBlogList(ctx.params.userName, 0)
  await ctx.render('profile', {
    blogData,
    userData: {
      isMe: true,
      userInfo: ctx.session.userInfo
    }
  })
})

router.get('/square', loginRedirect, async ctx => {
  // 获取微博数据，第一页
  let result = await getSquareBlogList(0)
  let { isEmpty, blogList, pageSize, pageIndex, count } = result.data
  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    }
  })
})

module.exports = router