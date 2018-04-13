const ArticleModel = require('./base/article')

async function paginator(category, size=10, index=1) {
  const articles = await ArticleModel.find(category ? { category } : {}, { content: 0, __v: 0, markdown: 0, catelog: 0, comments: 0 })
                        .sort({ created_at: -1 })
                        .limit(+size)
                        .skip(+index - 1)
                        .exec()
  return articles
} 

async function findById(id, returnMarkDown = false) {
  const hex = /[0-9A-Fa-f]{6}/
  if (!hex.test(id)) return null
  const article = await ArticleModel.findById(
    id, 
    returnMarkDown
    ? {}
    : { markdown: 0, comments: 0 }
  )
  return article
}

async function findOne(filter, returnMarkDown) {
  const article = ArticleModel.findOne(
    filter, 
    returnMarkDown 
    ? { __v: 0 } 
    : { __v: 0, markdown: 0 }
  )
  return article
}

async function find(filter) {
  const articles = await ArticleModel.find(filter, {
    __v: 0,
    content: 0,
    markdown: 0
  })
  return articles
}

async function create(article) {
  const oldArticle = await findOne({ title: article.title })
  if (oldArticle) {
    return null
  }
  const newArticle = await ArticleModel.create(article)
  return newArticle
}

async function remove(_id) {
  const res = await ArticleModel.remove({ _id })
  return res
}

async function update(_id, article) {
  const res = await ArticleModel.updateOne(
    { _id }, 
    { ...article, updated_at: Date.now() }
  )
  return res
}

async function count() {
  const res = await ArticleModel.aggregate(
    [
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]
  )
  return res.map(cate => ({text: cate._id, count: cate.count}))
}

async function search(keyword) {
  const regex = new RegExp(`${keyword}`, 'i')
  const res = await ArticleModel.find(
    { title: { $regex:  regex } }, 
    { title: 1 }
  )
  return res
}

module.exports = {
  findOne,
  create,
  find,
  findById,
  remove,
  paginator,
  update,
  count,
  search
}