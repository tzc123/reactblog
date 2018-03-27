import { get, post } from './utils/request'
const domain = process.env.DEV == 'local'
               ? 'http://localhost:4321'
               : 'http://122.152.205.25:4321'

export function getArticleList(options) {
  return get(
    domain + '/article', 
    {
      category: options.category || '',
      size: options.size || 10,
      index: options.index || 1,
      sortby: options.sortby || 'created_at'
    }
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

export function search(keyword) {
  return get(
    domain + '/search', 
    { keyword }
  )
    .then(res => {
      return res.success
      ? res.data
      : []
    })
}

export function comment(id, text) {
  if (!id || !text ) return
  return post(
    domain + '/article/' + id + '/comment', 
    { text },
    { withCredentials: true }
  )
    .then(res => {
      return res.success
      ? res.data
      : null
    })
}

export function getComments(id) {
  if (!id) return
  return get(domain + '/article/' + id + '/comments')
    .then(res => {
      return res.success
      ? res.data
      : null
    })
}

