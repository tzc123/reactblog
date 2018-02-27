import { get, post } from './utils/request'
const domain = process.env.DEV == 'local'
               ? 'http://localhost:4321'
               : 'http://122.152.205.25:4321'

export function getArticleList(category, index) {
  return get(
    domain + '/article', 
    category 
    ? { category, size: 10, index } 
    : { size: 10, index }
  )
  .then(res => {
    return res.success
    ? res.data
    : []
  })
  .catch(err => {
    console.log(err)
    return []
  })
}

export function getArticle(id) {
  return get(domain + '/article/' + id)
  .then(res => {
    return res.success 
    ? res.data
    : null
  })
  .catch(err => {
    console.log(err)
    return null
  })
}

export function getArticleCount() {
  return get(domain + '/count')
  .then(res => {
    return res.success
    ? res.data
    : []
  })
  .catch(err => {
    console.log(err)
    return []
  })
}
