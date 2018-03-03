const axios = require('axios')
const domain = 'http://122.152.205.25:4321'

module.exports = {
  async getArticleCount() {
    const res = await axios.get(domain + '/count')
    if (res.status == 200) {
      if (res.data.success) {
        return res.data.data
      }
    }
    return []
  },
  async getArticles() {
    const res = await axios.get(domain + '/article?size=10&index=1')
    if (res.status == 200) {
      if (res.data.success) {
        return res.data.data
      }
    }
    return []
  },
  async getArticle(id) {
    const res = await axios.get(`${domain}/article/${id}`)
    if (res.status == 200) {
      if (res.data.success) {
        return res.data.data
      }
    }
    return {}
  }
}
