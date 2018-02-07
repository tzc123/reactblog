const Router = require("koa-router");
const router = new Router();

const { article, home } = require('./controllers/index')

router
  .get("/", home.index)
  .get('/article', article.index)
  .post('/article', article.insert)

module.exports = router;
