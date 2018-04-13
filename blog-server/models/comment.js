const ArticleModel = require('./base/article')

async function setComment(_id, comment) {
  const res = await ArticleModel.updateOne(
    { _id }, 
    { $push: { comments: comment } } 
  )
  return res
}

async function getComments(id) {
  const res = await ArticleModel.findById(id, { comments: 1 })
  return res
}

module.exports = {
  setComment,
  getComments
}