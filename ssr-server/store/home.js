const { getArticles } =  require('../api');

module.exports = async function () {
  const store = {
    currentPage: 1,
    total: 0,
    articles: [],
    list: [
      {
        text: 'time'
      },
      {
        text: 'browse'
      },
      {
        text: 'default'
      }
    ],
    active: 2,
    animated: false,
    category: '',
    fade: false

  }

  const articles = await getArticles()
  store.total = articles.length
  store.articles = articles

  return store
}