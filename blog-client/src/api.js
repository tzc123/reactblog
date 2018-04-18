import { get, post, createSource } from './utils/request'
const domain = process.env.DEV == 'local'
               ? 'http://localhost:4321'
               : 'http://122.152.205.25:4321'
const isNode = typeof window === 'undefined'
const directives = {}
const changeProgress = isNode ? () => {} : require('./stores/header').default.changeProgress

function preventRepeate(id) {
  if (directives[id]) {
    directives[id]('repeated operation: cancel last operation')
  }
  const source = createSource()
  directives[id] = source.cancel
  return source.token
}

export function getArticleList({category = '', size = 10, index = 1, sortby = 'created_at'}) {
  const token = preventRepeate('getArticleList')
  changeProgress(0.1)
  return get(
    domain + '/article', 
    { category, size, index, sortby }, {
      cancelToken: token,
      onDownloadProgress: e => changeProgress(e.loaded / e.total),
      withCredentials: true
    }
  ).then(res => {
    return res.success
    ? res.data
    : []
  }).catch(err => {
    changeProgress(0)          
    console.log(err)
    return []
  })
}

export function getArticle(id) {
  const token = preventRepeate('getArticle')  
  changeProgress(0.1)  
  return get(
    domain + '/article/' + id, 
    {}, {
      cancelToken: token,
      onDownloadProgress: e => changeProgress(e.loaded / e.total),
      withCredentials: true
    }
  ).then(res => {    
    return res.success 
    ? res.data
    : null
  }).catch(err => {
    changeProgress(0)      
    console.log(err)
    return null
  })
}

export function getArticleCount() {  
  const token = preventRepeate('getArticleCount')      
  return get(domain + '/count', {}, {
    cancelToken: token
  })
  .then(res => {
    return res.success
    ? res.data
    : []
  }).catch(err => {
    console.log(err)
    return []
  })
}

export function search(keyword) {
  const token = preventRepeate('search')  
  changeProgress(0.1)  
  return get(
    domain + '/search', 
    { keyword }, {
      onDownloadProgress: e => changeProgress(e.loaded / e.total),
      withCredentials: true,
      cancelToken: token
    }
  ).then(res => { 
    return res.success
    ? res.data
    : []
  }).catch(err => {
    changeProgress(0) 
    console.log(err)
    return []
  })
}

export function comment(id, text) {
  const token = preventRepeate('comment')    
  if (!id || !text ) return
  return post(
    domain + '/article/' + id + '/comment', 
    { text }, { 
      withCredentials: true,
      cancelToken: token
    }
  ).then(res => {
    return res.success
    ? res.data
    : null
  }).catch(err => {
    console.log(err)
    return null
  })
}

export function getComments(id) {
  const token = preventRepeate('getComments')    
  if (!id) return
  return get(domain + '/article/' + id + '/comment', {}, {
    cancelToken: token
  })
  .then(res => {
    return res.success
    ? res.data
    : null
  }).catch(err => {
    console.log(err)
    return null
  })
}

