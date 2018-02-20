import axios from 'axios'
const domain = 'http://122.152.205.25:4321'

export async function getArticleList(category, index) {
  try {
    const res = await axios.get(domain + '/article', category ? { category, size: 10, index } : { size: 10, index })
    if (res.status == 200) {
      if (res.data.success) {
        return res.data.data
      }
    }
    return []
  } catch (err) {
    console.log(err)
    return []
  }
}

export async function getArticle(id) {
  try {
    const res = await axios.get(domain + '/article/' + id)
    if (res.status == 200) {
      if (res.data.success) {
        return res.data.data
      }
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
}
