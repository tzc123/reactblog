const Router = require("koa-router");
const path = require('path')
const router = new Router();

const { article, login, image: { parser, upload } } = require('./controllers/index')

router
  .get('/login', login.index)
  .get('/article', article.list)
  .get('/article/:id/comments', article.getComments)
  .get('/article/:id', article.index)
  .get('/count', article.count)
  .get('/search', article.search)
  .get('/flush', article.flush)
  .post('/article', article.create)
  .post('/article/:id/remove', article.remove)
  .post('/article/:id/comment', article.comment)
  .post('/article/:id', article.update)
  .post('/image', parser, upload)

module.exports = router;
