const Router = require("koa-router");
const router = new Router();
const ArticleModel = require('./modal/article')
const data = [];

router
  .get("/", ctx => {
    ctx.redirect("/index.html");
  })
  .get('/article', async ctx => {
    const { query: { title, _id } } = ctx
    const filter = {}
    if (title) {
      filter.title = title
    } else if (_id) {
      filter._id = _id
    }
    try {
      const article = await ArticleModel.findArticle(filter)
      ctx.body = article
    } catch(e) {
      console.log(e)
      ctx.body = e
    }
  })
  .post('/article', async ctx => {
    try {
      const newArticle = await ArticleModel.insert(ctx.request.body)
      ctx.body = newArticle
    } catch (e) {
      console.log(e)
      ctx.body = e.stack
    }
  })

module.exports = router;
