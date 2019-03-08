import http from './utils/request'

export function getArticleList({category = '', size = 10, index = 1, sortby = 'created_at'}) {
  console.log({ category, size, index, sortby })
  return http.get(
    '/article', 
    { params: { category, size, index, sortby } }
  )
}

export function getArticle({ id }) {
  return http.get('/article/' + id)
}

export function getArticleCount() {
  return http.get('/count')
}

export function search({ keyword }) {
  return http.get(
    '/search', 
    { params: { keyword } }
  )
}

export function comment({ id, text }) {
  return http.post(
    '/article/' + id + '/comment', 
    { text }
  )
}

export function getComments({ id }) {
  return http.get('/article/' + id + '/comment')
}

