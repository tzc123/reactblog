
const ArticleModel = require('../models/article')
const cache = require('../cache')
const { getBrowses } = require('./browse')
const { unknownError, flush } = require('../services/index')

module.exports = {
  async getArticles(category = '', size, index, sortby) {
    let articles = await cache.hget('articles', category) 
    const browses = await getBrowses()   
    if (!articles) {
      try {
        articles = await ArticleModel.paginator(category)
        const res = await cache.hset(
          'articles', 
          category || '',
          JSON.stringify(articles))
      } catch (err) {
        logger.error('getArticles', { category, size, index, err: err.stack })
        return []
      }
    } else {
      articles = JSON.parse(articles)
    }
    articles = articles.map(article => {
      const browse = browses[article._id] || 0
      article.browse = browse
      return article
    })
    articles = articles.sort((a, b) => {
      if (sortby != 'browse') {
        const timeA = new Date(a.created_at).getTime()
        const timeB = new Date(b.created_at).getTime()
        return timeB - timeA
      } else {
        const browseA = +a.browse
        const browseB = +b.browse
        return browseB - browseA
      }
    })

    return articles
  },
  async getArticle(id) {
    let article = await cache.get(id)
    if (!article) {
      try {
        article = await ArticleModel.findById(id)
        await cache.set(id, JSON.stringify(article))
      } catch(err) {
        logger.error('getArticle', { id, err: err.stack })
        return null
      }
    } else {
      article = JSON.parse(article)
    }
    return article
  },
  async createArticle(ctx, params) {
    const { request: { body = {}, url, method } } = ctx
    try {
      const newArticle = await ArticleModel.create(params)
      if (!newArticle) {
        logger.info('同名', { url, method, title })
        ctx.body = {
          success: false,
          message: '已有同名文章'
        }
      } else {
        flush(url, method)
        logger.info('已添加', { id: newArticle._id.toString(), url, method })          
        ctx.body = {
          success: true,
          message: '添加成功'
        }
      }
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async removeArticle(ctx, id) {
    const { request: { body = {}, url, method } } = ctx
    try {
      const res = await ArticleModel.remove(id)
      if (res.ok == 1) {
        if (res.n >= 1) {
          flush(url, method)
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
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async updateArticle(ctx, id, params) {
    const { request: { body = {}, url, method } } = ctx
    try {
      const { ok, nModified, n } = await ArticleModel.update(id, params)
      if (ok == 1) {
        if (n >= 1) {
          if (nModified == 0) {
            logger.info('未改动', { url, method, id })
            ctx.body = {
              success: false,
              message: '没有需要更新的地方'
            }
          } else {
            flush(url, method)
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
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async getCount() {
    let count = await cache.get('articleCount')
    if (!count) {
      try{
        count = await ArticleModel.count()
        await cache.set('articleCount', JSON.stringify(count))
      } catch (err) {
        logger.error('getCount', { err: err.stack })
        return []
      }
    } else {
      count = JSON.parse(count)
    }
    return count
  },
  async saveArticleCache(article) {
    await cache.set('articleCache', JSON.stringify(article))
  },
  async getArticleCache() {
    const articleCache = await cache.get('articleCache')
    return JSON.parse(articleCache)
  }
}