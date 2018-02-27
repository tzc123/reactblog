module.exports = function (articles) {
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