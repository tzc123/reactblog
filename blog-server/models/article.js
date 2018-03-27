const mongoose = require('mongoose')
const { Types: { ObjectId }, Schema } = mongoose
const commentType = {
  text: {
    type: String,
    required: true
  }, 
  incisive: {
    type: Number,
    default: 0
  }, 
  useful: {
    type: Number,
    default: 0
  }, 
  useless: {
    type: Number,
    default: 0
  }, 
  nonsense: {
    type: Number,
    default: 0
  }, 
  created_at: {
    type: String,
    default: Date.now
  }
}
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
  },
  catelog: {
    type: Array,
    default: []
  },
  comments: {
    type: [
      {
        ...commentType,
        subComments: {
          type: commentType,
          default: []
        }
      }
    ],
    default: []
  }
})
const ArticleModel = mongoose.model('article', ArticleSchema)

async function paginator(category, size=10, index=1) {
  const articles = await ArticleModel.find(category ? { category } : {}, { content: 0, __v: 0, markdown: 0, catelog: 0 })
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
    : { markdown: 0 }
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

async function setBrowse(_id, icrement) {
  const res = await ArticleModel.updateOne({ _id }, { $set: { browse: icrement } })
  return res
}

async function getBrowse(id) {
  const res = await ArticleModel.findById(id, { browse: 1, _id: 1 })
  return res
}

async function getBrowses() {
  const res = await ArticleModel.find({}, { browse: 1, _id: 1 })
  console.log(res)
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

async function setComment(_id, comment) {
  const res = await ArticleModel.updateOne(
    { _id }, 
    { $push: { comments: comment } } 
  )
  return res
}

async function getComments(id) {
  const res = await ArticleModel.findById(id, { comments: 1, _id: 1 })
  console.log(res)
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
  setBrowse,
  count,
  getBrowse,
  getBrowses,
  search,
  setComment,
  getComments
}