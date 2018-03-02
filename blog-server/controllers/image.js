const koaBody = require('koa-body')
const path = require('path')

module.exports = {
  parser: koaBody({
    multipart: true,
    onError(err, ctx) {
      const { request: { url, method } } = this
      logger.error('未知错误', { url, method, err: err.stack })
      ctx.body = {
        success: false,
        message: err.stack
      }
    },
    formidable: {
      onFileBegin(name, file) {
        console.log(file)
        if (name == 'file' && file.type.indexOf('image') != -1) {
          file.path = path.join(__dirname, '../../static/images/') + file.name
        } 
      }
    }
  }),
  upload(ctx) {
    const { request: { body: { files: file }, url, method } } = ctx
    if (file && file.file && file.file.type.indexOf('image') != -1) {
      logger.info('上传成功', { url, method, filename: file.file.name })
      ctx.body = {
        success: true,
        message: file.file.name
      }
    } else {
      logger.info('格式错误', { url, method })
      ctx.body = {
        success: false,
        message: '格式错误'
      }
    }
  }
}