const ArticleModel = require('../models/article')

module.exports = {
  async list(ctx) {
    const { query: { category, size, index } } = ctx
    try{
      const articles = await ArticleModel.paginator(category, size || 10, index || 1)
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
        message: '查找文章列表时错误'
      }
      logger.error('查找文章列表时错误', { category, err: e.stack })
    }
  },
  async index(ctx) {
    const { params: { id } } = ctx
    try {
      const article = await ArticleModel.findById(id)
      if (article) {
        ctx.body = {
          success: true,
          data: article
        }
      } else {
        ctx.status = 404
      }
    } catch (e) {
      ctx.body = {
        success: false,
        message: '查找文章时错误'
      }
      logger.error('查找文章时错误', { id, err: e.stack })
    }
  },
  async create(ctx) {
    const { request: { body: { content, description, title, category } } } = ctx 
    if (content && title && category) {
      try {
        const newArticle = await ArticleModel.create({
          category,
          content,
          title,
          description: !!description ? description : ''
        })
        if (!newArticle) {
          ctx.body = {
            success: false,
            message: '已有同名文章'
          }
          logger.info('已有同名文章', { title } )
        } else {
          ctx.body = {
            success: true,
            message: '添加成功'
          }
          logger.info('成功添加文章', { id: newArticle._id.toString() } )
        }
      } catch (e) {
        ctx.body = {
          success: false,
          message: '数据库写入时错误'
        }
        logger.error('数据库写入时错误', { title, err: e.stack })
      }
    } else {
      logger.info('添加文章时参数错误', { title })
      ctx.body = {
        success: false,
        message: '添加文章时参数错误'
      }
    }
  },
  async remove(ctx) {
    const { params: { id } } = ctx
    if (id) {
      try {
        const res = await ArticleModel.remove(id)
        if (res.ok == 1) {
          if (res.n >= 1) {
            ctx.body = {
              success: true,
              message: '删除成功'
            }
          } else {
            ctx.body = {
              success: false,
              message: '该文章不存在'
            }
          }
        } else {
          ctx.body = {
            success: false,
            message: '删除文章时数据库错误'
          }
          logger.error('删除文章时数据库错误', { id })
        }
      } catch (e) {
        ctx.body = {
          success: false,
          message: '删除文章时错误'
        }
        logger.error('删除文章时错误', { id })
      }
    } else {
      logger.info('删除文章时参数错误', { id })
      ctx.body = {
        success: false,
        message: '删除文章时参数错误'
      }
    }
  }
}