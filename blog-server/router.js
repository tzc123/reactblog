const Router = require("koa-router");
const router = new Router();

const { article, login } = require('./controllers/index')

router
  .get('/login', login.index)
  .get('/article', article.list)
  .get('/article/:id', article.index)
  .post('/article', article.create)
  .post('/article/:id/remove', article.remove)

module.exports = router;
