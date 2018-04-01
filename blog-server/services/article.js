
const ArticleModel = require('../models/article')
const md5 = require('md5')
const config = require('../config')
const cache = require('../cache')
const hex = /[0-9A-Fa-f]{6}/

async function getBrowses() {
  let browses = await cache.hgetall('browse')
  if (typeof browses != 'object' || browses == null) {
    try {
      browses = {}
      const newBrowses = await ArticleModel.getBrowses()
      newBrowses.forEach(browse => {
        browses[browse.id] = browse.browse
      })
      await cache.hmset('browse', browses)
    } catch (err) {
      logger.error('getBrowses', { err: err.stack })
      return {}
    }
  } 
  return browses
}

module.exports = {
  async flush() {
    let res = false
    try {
      const browses = await cache.hgetall('browse')
      if (typeof browses == 'object' || browses != null) {
        const keys = Object.keys(browses)
        for(key of keys) {
          await ArticleModel.setBrowse(key, browses[key])
        }
      }
      res = await cache.flush()
    } catch (err) {
      logger.error('flush', { err: err.stack })
      return false
    }
    return res
  },
  async getArticles(category, size, index, sortby) {
    let articles = await cache.hget('articles', category || '') 
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
    if (isNaN(browse)) {
      try {
        browse = (await ArticleModel.getBrowse(id)).browse       
        await cache.hset('browse', id, browse)
      } catch (err) {
        logger.error('getBrowse', { id, err: err.stack })
        return 0
      }
    }
    return browse
  },
  getBrowses,
  async setBrowse(id) {
    let res = false
    try {
      res = await cache.hincrby('browse', id, 1)
    } catch (err) {
      logger.error('browse', { id, err: err.stack })      
      return false
    }
    return res
  },
  checkId(ctx, id) {
    const { request: { url, method } } = ctx
    if (!hex.test(id)) {
      logger.error('非法id', { url, method })
      ctx.body = {
        success: false,
        message: '非法id'
      }
      return false
    }
    return true
  },
  simpleAuth(ctx, secret) {
    const { request: { url, method } } = ctx
    if (md5(secret) != config.secret) {
      logger.info('无权限', { url, method, secret })          
      ctx.body = {
        success: false,
        message: '无权限'
      }
      return false
    }
    return true
  },
  unknownError(ctx, err) {
    const { request: { url, method } } = ctx
    logger.error('未知错误', { url, method, err: err.stack })
    ctx.body = {
      success: false,
      message: '未知错误'
    }
  }
}