/**
 * @description utils api 路由
 * @author EricWXT
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginCheck } = require('../../middlewares/auth')
const { saveFile } = require('../../controllers/utils')


router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async ctx => {
  let file = ctx.req.files['file']
  let { size, path, name, type } = file
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})

module.exports = router