require('es6-promise').polyfill()
import axios from 'axios';

export function get(url, query = {}, options = {}) {
  if (typeof url != 'string' || (query && query.toString() != '[object Object]')) {
    return console.error(new Error('get([string], ?[object])'))
  }

  return axios
  .get(url, { 
    params: query,
    ...options
  })
  .then(res => {
    if (res.status == 200) {
      return res.data
    } else {
      throw res.statusText
    }
  })
}

export function post(url, data, options) {
  if (typeof url != 'string' || (data && data.toString() != '[object Object]')) {
    return console.error(new Error('post([string], [object])'))
  }

  return axios
  .post(url, data, options)
  .then(res => {
    if (res.status == 200) {
      return res.data
    } else {
      throw res.statusText
    }
  })
}

export const createSource = axios.CancelToken.source