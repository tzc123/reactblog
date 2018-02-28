const ArticleModel = require('../models/article')
const config = require('../config')
const cache = require('../cache')

async function flush(url, method) {
  const res = await cache.flush()
  res
  ? logger.info('清除缓存成功', { url, method })
  : logger.error('清除缓存失败', { url, method })
}

async function getArticles(category, size, index, url, method) {
  let articles = await cache.get(`articles${category || ''}`)
  if (!articles) {
    articles = await ArticleModel.paginator(category, size || 10, index || 1)
    const res = await cache.set(`articles${category || ''}`, JSON.stringify(articles))
    res 
    ? logger.info(`缓存articles${category || ''}`, url, method)
    : logger.error(`缓存articles${category || ''}失败`, url, method)
  } else {
    articles = JSON.parse(articles)
  }
  return articles
}

async function getCount(url, method) {
  let count = await cache.get('articleCount')
  if (!count) {
    count = await ArticleModel.count()
    const res = await cache.set('articleCount', JSON.stringify(count))
    res 
    ? logger.info('缓存articleCount', url, method)
    : logger.error('缓存articleCount失败', url, method)
  } else {
    count = JSON.parse(count)
  }
  return count
}

function simpleAuth(ctx, secret) {
  if (secret != config.secret) {
    logger.info('无权限', { url, method, secret })          
    ctx.body = {
      success: false,
      message: '无权限'
    }
    return false
  }
  return true
}

module.exports = {
  async list(ctx) {
    const { 
      query: { category, size, index }, 
      request: { url, method } } = ctx
    try{
      let articles = await getArticles(category, size, index, url, method)
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
    const { 
      params: { id }, 
      query: { rmd }, 
      request: { url, method } 
    } = ctx
    try {
      const article = await ArticleModel.findById(id, rmd == 1)
      if (article) {
        logger.info('查找文章成功', { url, method })            
        ctx.body = {
          success: true,
          data: article
        }
        if (rmd != 1) {
          const { ok } = await ArticleModel.browse(id, article.browse + 1)
          if (ok == 1) {
            logger.info('一次浏览', { url, method })
          } else {
            logger.error('数据库错误', { url, method, browse })
          }
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
    const { request: { body = {}, url, method } } = ctx
    const { content, description, title, catelog, category, markdown , secret} = body
    if (!simpleAuth(ctx, secret)) return
    if (content && title && category && markdown && catelog && Array.isArray(catelog)) {
      try {
        const newArticle = await ArticleModel.create({
          category,
          content,
          markdown,
          title,
          catelog,
          description: description || ''
        })
        if (!newArticle) {
          logger.info('同名', { title, url, method })
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
    const { 
      params: { id }, 
      request: { method, url , body = {}}, 
    } = ctx
    const { secret } = body
    if (!simpleAuth(ctx, secret)) return
    if (id) {
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
    const { params: { id }, request: { body = {}, url, method } } = ctx
    const { content, description, title, category, markdown, catelog, secret } = body
    if (!simpleAuth(ctx, secret)) return
    if (content && title && category && markdown && catelog && Array.isArray(catelog)) {
      try {
        const { ok, nModified, n } = await ArticleModel.update(id, {
          category,
          content,
          markdown,
          catelog,
          title,
          description: description || ''
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
  },
  async count(ctx) {
    const { request: { url, method } } = ctx
    try {
      let count = await getCount(url, method)
      logger.info('查询成功', url, method)
      ctx.body = {
        success: true,
        data: count
      }
    } catch (e) {
      logger.error('数据库错误', url, method)      
      ctx.body = {
        success: false,
        message: '未知错误'
      }
    }
  }
}