const mongoose = require('mongoose')
const { Types: { ObjectId }, Schema } = mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 128,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    maxlength: 512,
    trim: true
  },
  category: {
    type: String,
    default: 'Other'
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  browse: {
    type: Number,
    default: 0,
    min: 0
  },
  markdown: {
    type: String,
    required: true
  }
})
const ArticleModel = mongoose.model('article', ArticleSchema)
async function paginator(category, size, index) {
  const articles = await ArticleModel.find(category ? { category } : {}, { content: 0, __v: 0})
                        .limit(size)
                        .skip(index - 1)
                        .exec()
  return articles
} 
async function findById(id, returnMarkDown) {
  const hex = /[0-9A-Fa-f]{6}/g
  if (hex.test(id)) {
    const article = await findOne({ _id: id }, returnMarkDown ? { __v: 0 } : { __v: 0, markdown: 0 })
    return article
  } else {
    return null
  }
}
async function findOne(filter) {
  const article = ArticleModel.findOne(filter, {
    __v: 0
  })
  return article
}
async function find(filter) {
  const articles = await ArticleModel.find(filter, {
    __v: 0,
    content: 0
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
module.exports = {
  findOne,
  create,
  find,
  findById,
  remove,
  paginator
}