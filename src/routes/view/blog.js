/**
 * @description 微博view 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/auth')
const { getProfileBlogList } = require('../../controllers/profile')
const { getSquareBlogList } = require('../../controllers/square')
const { isExist } = require('../../controllers/user')
const { getFans } = require('../../controllers/relation')

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

  // 已登录用户的信息
  let myUserInfo = ctx.session.userInfo
  let myUserName = myUserInfo.userName

  let curUserInfo
  let { userName: curUserName } = ctx.params
  let isMe = myUserName === curUserName

  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    let existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  // 获取微博第一页数据
  let { data: blogData } = await getProfileBlogList(curUserName, 0)

  // 获取粉丝
  let fansResult = await getFans(curUserInfo.id)
  let { count, fansList } = fansResult.data

  await ctx.render('profile', {
    blogData,
    userData: {
      isMe: true,
      userInfo: ctx.session.userInfo,
      fansData: {
        count,
        list: fansList,
      }
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