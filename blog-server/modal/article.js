const mongoose = require('mongoose')
const { Schema } = mongoose
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 4,
    trim: true
  },
  description: {
    type: String,
    maxlength: 50,
    trim: true
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  }
})
const ArticleModel = mongoose.model('article', ArticleSchema)

module.exports = {
  async findArticle(filter) {
    const articles = await ArticleModel.find(filter)
    return articles
  },
  async insert(article) {
    const newArticle = await ArticleModel.create(article)
    return newArticle
  }
}