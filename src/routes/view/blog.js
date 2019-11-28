/**
 * @description 微博view 路由
 * @author EricWXY
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/auth')
const { getProfileBlogList } = require('../../controllers/profile')
const { getSquareBlogList } = require('../../controllers/square')
const { isExist } = require('../../controllers/user')
const { getFans, getFollowers } = require('../../controllers/relation')
const { getHomeBlogList } = require('../../controllers/blog')

// 首页
router.get('/', loginRedirect, async ctx => {
  let userInfo = ctx.session.userInfo
  let { id: userId } = userInfo

  // 获取第一页数据
  let result = await getHomeBlogList(userId)
  let { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  let fansResult = await getFans(userId)
  let { count: fansCount, fansList } = fansResult.data

  // 获取关注人列表
  let followersResult = await getFollowers(userId)
  let { count: followerCount, followersList } = followersResult.data
  console.log(followersList)
  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList,
      },
      followersData: {
        count: followerCount,
        list: followersList,
      },
    },
    blogData: { isEmpty, blogList, pageSize, pageIndex, count }
  })
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
  console.log(curUserName)

  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    let existResult = await isExist(curUserName)
    console.log(existResult)
    if (existResult.errno === 10001) {
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

  // 获取关注人列表
  let followersResult = await getFollowers(curUserInfo.id)
  let { count: followerCount, followersList } = followersResult.data

  // 我是否关注了此人
  let amIFollowed = fansList.some(item => item.userName == myUserName)

  await ctx.render('profile', {
    blogData,
    userData: {
      isMe,
      userInfo: curUserInfo,
      fansData: {
        count,
        list: fansList,
      },
      followersData: {
        count: followerCount,
        list: followersList,
      },
      amIFollowed,
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
