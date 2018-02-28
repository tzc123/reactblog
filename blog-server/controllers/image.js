const koaBody = require('koa-body')
const path = require('path')

module.exports = {
  parser: koaBody({
    multipart: true,
    onError(err, ctx) {
      ctx.body = {
        success: false,
        message: err.stack
      }
    },
    formidable: {
      onFileBegin(name, file) {
        if (name == 'file' && file.type.indexOf('image') != -1) {
          file.path = path.join(__dirname, '../../static/images/') + file.name
        } 
      }
    }
  }),
  upload(ctx) {
    const file = ctx.request.body.files.file
    if (file && file.type.indexOf('image') != -1) {
      ctx.body = {
        success: true,
        message: ctx.request.body.files.file.name
      }
    } else {
      ctx.body = {
        success: false,
        message: '文件格式错误'
      }
    }
  }
}