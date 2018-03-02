
const ArticleModel = require('../models/article')
const config = require('../config')
const cache = require('../cache')

module.exports = {
  async flush() {
    try {
      const browses = await cache.hgetall('browse')
      if (typeof browses === 'object') {
        const keys = Object.keys(browses)
        for(key of keys) {
          await ArticleModel.setBrowse(key, browses[key])
        }
      }
      const res = await cache.flush()
    } catch (err) {
      logger.error('flush', { err: err.stack })
      return false
    }
    return res
  },
  async getArticles(category, size, index) {
    let articles = await cache.hget('articles', category || '') 
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
  async getCount() {
    let count = await cache.get('articleCount')
    if (!count) {
      try{
        count = await ArticleModel.count()
        await cache.set('articleCount', JSON.stringify(count))
      } catch (err) {
        logger.err('getCount', { err: err.stack })
        return []
      }
    } else {
      count = JSON.parse(count)
    }
    return count
  },
  async getBrowse(id) {
    let browse = await cache.hget('browse',id)
    if (isNaN(count)) {
      try {
        browse = await ArticleModel.getBrowse(id)
        await cache.hset('browse', id, browse)
      } catch (err) {
        logger.error('getBrowse', { id, err: err.stack })
        return 0
      }
    }
    return browse
  },
  async setBrowse(id) {
    try {
      const res = await cache.hincrby('browse', id, 1)
    } catch (err) {
      logger.error('browse', { id, err: err.stack })      
      return false
    }
    return res
  },
  simpleAuth(ctx, secret) {
    if (secret != config.secret) {
      logger.info('无权限', { request: ctx.request, secret })          
      ctx.body = {
        success: false,
        message: '无权限'
      }
      return false
    }
    return true
  },
  unknownError(ctx, err) {
    logger.error('未知错误', { request: ctx.request, err: err.stack })
    ctx.body = {
      success: false,
      message: '未知错误'
    }
  }
}