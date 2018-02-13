const ArticleModel = require('../modals/article')

module.exports = {
  async list(ctx) {
    const { query: { category } } = ctx
    const filter = {}
    if (category) {
      filter.category = category
    }
    try{
      const articles = await ArticleModel.findArticles(filter)
      if (articles.length == 0) {
        ctx.body = {
          success: false,
          message: '没有发现任何相关文章'
        }
      }
      ctx.body = {
        success: true,
        data: articles
      }
    } catch (e) {
      ctx.body = {
        success: false,
        message: '失败:查找文章列表时错误'
      }
      logger.error('查找文章列表时错误', { category, err: e.stack })
    }
  },
  async index(ctx) {
    const { params: { id } } = ctx
    try {
      const article = await ArticleModel.findArticle(id)
      if (article) {
        ctx.body = {
          success: true,
          data: article
        }
      } else {
        ctx.status = 404
      }
    } catch(e) {
      ctx.body = {
        success: false,
        message: '失败:查找文章时错误'
      }
      logger.error('查找文章时错误', { id, err: e.stack })
    }
  },
  async insert(ctx) {
    const { request: { body: { content, description, title, secret } } } = ctx 
    if (content && title && secret) {
      try {
        const { _id } = await ArticleModel.insert({
          content,
          title,
          description: !!description ? description : ''
        })
        ctx.body = {
          success: true,
          message: '成功:添加成功'
        }
        logger.info('成功添加文章', { _id: _id.toString() } )
      } catch (e) {
        ctx.body = {
          success: false,
          message: '失败:' + e
        }
        logger.error('数据库写入时错误', { title, secret, content, description, err: e.stack })
      }
    } else {
      logger.info('添加文章时参数错误', { title, secret, content, description })
      ctx.body = {
        success: false,
        message: '失败:参数错误'
      }
    }
  }
}