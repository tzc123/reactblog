const Router = require("koa-router");
const path = require('path')
const router = new Router();

const { article, login, image: { parser, upload } } = require('./controllers/index')
const articleValidator = require('./validators/article')

router
  .get('/login', login.index)
  .get('/article', articleValidator.list, article.list)
  .get('/article/:id/comment', article.getComments)
  .get('/article/:id', articleValidator.index, article.index)
  .get('/count', article.count)
  .get('/search', article.search)
  .get('/flush', article.flush)
  .post('/article', article.create)
  .post('/article/:id/remove', article.remove)
  .post('/article/:id/comment', article.comment)
  .post('/article/:id', article.update)
  .post('/image', parser, upload)

module.exports = router;
