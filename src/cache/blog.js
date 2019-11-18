/**
 * @description 微博缓存层
 * @author EricWXY  
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

//redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * @description 获取广场列表的缓存
 * @param {Number} pageIndex 页码
 * @param {Number} pageSize 页大小
 */
async function getSquareCacheList(pageIndex, pageSize) {
  let key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 尝试获取缓存
  let cacheResult = await get(key)
  if (cacheResult != null)
    return cacheResult

  // 没有缓存，则读取数据库
  let result = await getBlogListByUser(
    {pageIndex, pageSize}
  )
  // 设置缓存
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList
}
