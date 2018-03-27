module.exports = function (articles) {
  if (({}).toString.call(articles) != '[object Array]') {
    logger.error('getArticleCount([array])', { err: new Error().stack })
    return {}
  }
  const articleCount = {}
  articles.forEach(article => {
    if (articleCount[article.category]) {
      articleCount[article.category] += 1
    } else {
      articleCount[article.category] = 1
    }
  })
  return Object
          .keys(articleCount)
          .map(key => ({ text: key, count: articleCount[key] }))
}