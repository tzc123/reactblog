const ArticleModel = require('./base/article')

async function setBrowse(_id, icrement) {
  const res = await ArticleModel.updateOne({ _id }, { $set: { browse: icrement } })
  return res
}

async function getBrowse(id) {
  const res = await ArticleModel.findById(id, { browse: 1, _id: 0 })
  return res
}

async function getBrowses() {
  const res = await ArticleModel.find({}, { browse: 1, _id: 1 })
  return res
}

module.exports = {
  setBrowse,
  getBrowse,
  getBrowses
}