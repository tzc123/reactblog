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
    _id: false,
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

module.exports = ArticleModel