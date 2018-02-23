module.exports = {
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