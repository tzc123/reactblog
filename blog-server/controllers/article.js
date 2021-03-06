const ArticleModel = require('../models/article')
const CommentModel = require('../models/comment')
const BrowseModel = require('../models/browse')
const config = require('../config')
const cache = require('../cache')

const { getArticles, getArticle, createArticle, getCount, removeArticle, getArticleCache, saveArticleCache } = require('../services/article')
const { getBrowse, setBrowse, getBrowses } = require('../services/browse')
const { flush, unknownError, simpleAuth, checkId } = require('../services/index')

module.exports = {
  async list(ctx) {
    const { 
      query: { category, size, index, sortby }, 
      request: { url, method } } = ctx
    try {
      let articles = await getArticles(category, size, index, sortby)
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
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async index(ctx) {
    const { 
      params: { id }, 
      query: { rmd }, 
      request: { url, method },
      session
    } = ctx
    try {
      const article = rmd == 1
      ? await ArticleModel.findById(id, true)
      : await getArticle(id)
      if (article) {
        article.browse = await getBrowse(id)
        logger.info('查找文章成功', { url, method })            
        ctx.body = {
          success: true,
          data: article
        }
        if (rmd != 1) {
          // if (!session.browse) {
          //   session.browse = 1
          //   const res = await setBrowse(id)
          //   res || await BrowseModel.setBrowse(id, 1)
          // } else {
          //   session.browse += 1
          // }
          const res = await setBrowse(id)
          res || await BrowseModel.setBrowse(id, 1)
        } 
      } else {
        logger.info('无此文章', { url, method })    
        ctx.body = {
          success: false,
          message: '文章不存在'
        }
      }
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async create(ctx) {
    const { request: { body = {}, url, method } } = ctx
    const { content, description = '', title, catelog, category, markdown , secret} = body
    if (!simpleAuth(ctx, secret)) return
    if (content && title && category && markdown && catelog && Array.isArray(catelog)) {
      createArticle(ctx, params)
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
    
    if (!checkId(ctx, id)) return
    if (!simpleAuth(ctx, secret)) return
    if (id) {
      removeArticle(ctx, id)
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
    const { content, description = '', title, category, markdown, catelog, secret } = body
    if (!checkId(ctx, id)) return
    if (!simpleAuth(ctx, secret)) return
    if (content && title && category && markdown && catelog && Array.isArray(catelog)) {
      updateArticle(ctx, id, {
        category,
        content,
        markdown,
        catelog,
        title,
        description: description
      })
    } else {
      logger.info('参数错误', { url, method, id  })
      ctx.body = {
        success: false,
        message: '参数错误'
      }
    }
  },
  async count(ctx) {
    const { request: { url, method } } = ctx
    try {
      let count = await getCount()
      logger.info('查询成功', { url, method })
      ctx.body = {
        success: true,
        data: count
      }
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async comment(ctx) {
    const { params: { id }, request: { body = {}, url, method } } = ctx
    let { text } = body
    if (!checkId(ctx, id)) return
    if (!text || (typeof text != 'string' && typeof text != 'number')) {
      logger.info('无内容', { url, method })
      ctx.body = {
        success: false,
        message: '请输入评论'
      }
    } else if (text.length > 500) {
      ctx.body = {
        success: false,
        message: '评论太长了'
      }
    } else if (ctx.session.commentTime && (Date.now() - ctx.session.commentTime) / 1000 < 30 ) {
      ctx.body = {
        success: false,
        message: '歇歇吧,30秒后再评论'
      }
    } else {
      try {
        const { ok, nModified, n } = await CommentModel.setComment(id, { text })
        if (ok) {
          logger.info('评论成功', { url, method, id })  
          ctx.session.commentTime = Date.now()             
          ctx.body = {
            success: true,
            message: '评论成功'
          }
        } else {
          logger.error('数据库错误', { url, method, id, text })          
          ctx.body = {
            success: false,
            message: '数据库错误'
          }
        }
      } catch (err) {
        unknownError(ctx, err)
      }
    }

  },
  async getComments(ctx) {
    const { params: { id }, request: { url, method } } = ctx
    if (!checkId(ctx, id)) return
    try {
      const comments = (await CommentModel.getComments(id)).comments
      if (comments) {
        logger.info('获取评论成功', { url, method })
        ctx.body = {
          success: true,
          data: comments
        }
      } else {
        logger.info('文章不存在', { url, method })
        ctx.body = {
          success: false,
          message: '文章不存在'
        }
      }
    } catch (err) {
      unknownError(ctx, err)
    }
  },
  async saveArticleCache(ctx) {
    
  },
  async search(ctx) {
    const { request: { url, method }, query: { keyword } } = ctx
    if (!keyword) {
      logger.info('无有效关键字', { url, method })
      ctx.body = {
        success: false,
        message: '无有效关键字'
      }
      return
    }
    try {
      const res = await ArticleModel.search(keyword)
      ctx.body = {
        success: true,
        data: res
      }
    } catch (err) {
      unknownError(ctx, err)      
    }
  },
  async flush(ctx) {
    const { request: { url, method }, query: { secret } } = ctx
    if (!secret) return
    if (!simpleAuth(ctx, secret)) return
    try {
      await flush(url, method)
    } catch (err) {
      unknownError(ctx, err)
    }
    ctx.body = {
      success: true,
      message: 'OK'
    }
  }
}