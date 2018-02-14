const Router = require("koa-router");
const router = new Router();

const { article, home } = require('./controllers/index')

router
  .get("/", home.index)
  .get('/article', article.list)
  .get('/article/:id', article.index)
  .post('/article', article.create)
  .post('/article/:id/remove', article.remove)

module.exports = router;
