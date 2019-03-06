
const ArticleModel = require('../models/article')
const cache = require('../cache')
const { getBrowses } = require('./browse')

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
  }
}