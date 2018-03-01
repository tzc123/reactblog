const { getArticles } =  require('../api');

module.exports = async function () {
  const store = {
    currentPage: 1,
    total: 0,
    articles: []
  }

  const articles = await getArticles()
  store.total = articles.length
  store.articles = articles

  return store
}