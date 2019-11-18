/**
 * @description utils controller
 * @author EricWXY
 */

const { ErrorModel, SuccessModel } = require('./_models/ResModel')
const { uploadFileSizeFailInfo } = require('./_models/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')

//文件保存目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploads')
//文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024

fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist)
    fse.ensureDir(DIST_FOLDER_PATH)
})

/**
 * @description 保存文件
 * @param {String} name 文件名
 * @param {String} type 文件类型
 * @param {Number} size 文件体积
 * @param {String} filePath 文件路径
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  //移动文件
  let fileName = Date.now() + '.' + name //防止重名
  let distFilePath = path.join(DIST_FOLDER_PATH, fileName) //文件移动目的地
  await fse.move(filePath, distFilePath)

  //返回信息
  return new SuccessModel({
    url: `/${fileName}`
  })
}

module.exports = {
  saveFile,
}
