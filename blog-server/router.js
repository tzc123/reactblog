const Router = require("koa-router");
const koaBody = require('koa-body')
const path = require('path')
const router = new Router();

const { article, login, image } = require('./controllers/index')

router
  .get('/login', login.index)
  .get('/article', article.list)
  .get('/article/:id', article.index)
  .post('/article', koaBody(), article.create)
  .post('/article/:id/remove', koaBody(), article.remove)
  .post('/article/:id', koaBody(), article.update)
  .post('/image', koaBody({
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
          file.path = path.join(__dirname, '../static/images/') + file.name
        } 
      }
    }
  }), image.upload)

module.exports = router;
