const ArticleModel = require('../models/article')

module.exports = {
  async list(ctx) {
    const { query: { category, size, index }, request: { url, method } } = ctx
    try{
      const articles = await ArticleModel.paginator(category, size || 10, index || 1)
      if (articles.length == 0) {
        logger.info('无相关文章', { url, method })
        ctx.body = {
          success: false,
          message: '没有发现任何相关文章'
        }
      } else {
        logger.info('查找列表成功', { url, method })      
        ctx.body = {
          success: true,
          data: articles
        }
      }
    } catch (e) {
      logger.error('未知错误', { url, method, err: e.stack })
      ctx.body = {
        success: false,
        message: '未知错误'
      }
    }
  },
  async index(ctx) {
    const { params: { id }, query: { rmd }, request: { url, method } } = ctx
    try {
      const article = await ArticleModel.findById(id, rmd == 1)
      if (article) {
        logger.info('查找文章成功', { url, method })              
        ctx.body = {
          success: true,
          data: article
        }
      } else {
        logger.info('无此文章', { url, method })    
        ctx.body = {
          success: false,
          message: '文章不存在'
        }
      }
    } catch (e) {
      logger.error('未知错误', { url, method, err: e.stack })      
      ctx.body = {
        success: false,
        message: '未知错误'
      }
    }
  },
  async create(ctx) {
    const { request: { body: { content, description, title, category, markdown }, url, method } } = ctx 
    if (content && title && category && markdown) {
      try {
        const newArticle = await ArticleModel.create({
          category,
          content,
          markdown,
          title,
          description: !!description ? description : ''
        })
        if (!newArticle) {
          logger.info('同名', { title, url, method })
          ctx.body = {
            success: false,
            message: '已有同名文章'
          }
        } else {
          logger.info('已添加', { id: newArticle._id.toString(), url, method })          
          ctx.body = {
            success: true,
            message: '添加成功'
          }
        }
      } catch (e) {
        ctx.body = {
          success: false,
          message: '未知错误'
        }
        logger.error('未知错误', {  url, method, err: e.stack })
      }
    } else {
      logger.info('参数错误', {  url, method })
      ctx.body = {
        success: false,
        message: '参数错误'
      }
    }
  },
  async remove(ctx) {
    const { params: { id }, request: { method, url } } = ctx
    if (id) {
      try {
        const res = await ArticleModel.remove(id)
        if (res.ok == 1) {
          if (res.n >= 1) {
            logger.info('已删除', {  url, method, id })
            ctx.body = {
              success: true,
              message: '删除成功'
            }
          } else {
            logger.info('无此文章', {  url, method, id })
            ctx.body = {
              success: false,
              message: '该文章不存在'
            }
          }
        } else {
          logger.error('数据库错误', {  url, method, res, id })
          ctx.body = {
            success: false,
            message: '数据库错误'
          }
        }
      } catch (e) {
        logger.error('未知错误', { url, method, id, err: e.stack })
        ctx.body = {
          success: false,
          message: '未知错误'
        }
      }
    } else {
      logger.info('参数错误', { url, method, id })
      ctx.body = {
        success: false,
        message: '参数错误'
      }
    }
  },
  async update(ctx) {
    const { params: { id }, request: { body: { content, description, title, category, markdown }, url, method } } = ctx
    if (content && title && category && markdown) {
      try {
        const { ok, nModified, n } = await ArticleModel.update(id, {
          category,
          content,
          markdown,
          title,
          description: !!description ? description : ''
        })
        if (ok == 1) {
          if (n >= 1) {
            if (nModified == 0) {
              logger.info('未改动', { url, method, id })
              ctx.body = {
                success: false,
                message: '没有需要更新的地方'
              }
            } else {
              logger.info('已更新', { url, method, id })
              ctx.body = {
                success: true,
                message: '更新成功'
              }
            }
          } else {
            logger.info('文章不存在', { url, method, id })
            ctx.body = {
              success: false,
              message: '未找到该文章'
            }
          }
        } else {
          logger.error('数据库错误', { url, method, id, res })
          ctx.body = {
            success: false,
            message: '数据库错误'
          }
        }
      } catch (e) {
        logger.error('未知错误', { url, method, id, err: e.stack })
        ctx.body = {
          success: false,
          message: '未知错误'
        }
      }  
    } else {
      logger.info('参数错误', { url: ctx.request.url, method: ctx.request.method, content, description, title, category, markdown, id  })
      ctx.body = {
        success: false,
        message: '参数错误'
      }
    }
  }
}