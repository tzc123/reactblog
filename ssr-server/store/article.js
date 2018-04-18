const { getArticle } = require('../api')

module.exports = async function (id) {
  return {
    article: await getArticle(id),
    active: 0,
    empty: true,
    comments: []
  }
}