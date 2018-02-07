const ArticleModel = require('../modals/article')

module.exports = {
  async index(ctx) {
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
      ctx.body = e.stack
    }
  },
  async insert(ctx) {
    try {
      const newArticle = await ArticleModel.insert(ctx.request.body)
      ctx.body = newArticle
    } catch (e) {
      console.log(e)
      ctx.body = e.stack
    }
  }
}