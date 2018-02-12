const mongoose = require('mongoose')
const { Types: { ObjectId }, Schema } = mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 3,
    trim: true
  },
  description: {
    type: String,
    maxlength: 50,
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
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
})
const ArticleModel = mongoose.model('article', ArticleSchema)

async function findArticle(id) {
  const hex = /[0-9A-Fa-f]{6}/g
  if (hex.test(id)) {
    const article = await ArticleModel.findOne({ _id: id })
    return article
  } else {
    return null
  }
}

async function findArticles(filter) {
  const articles = await ArticleModel.find(filter)
  return articles
}
async function insert(article) {
  const articles = findArticle(article._id)
  const newArticle = await ArticleModel.create(article)
  return newArticle
}
module.exports = {
  findArticle,
  insert,
  findArticles
}