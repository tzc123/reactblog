require('es6-promise').polyfill()
import axios from 'axios'

export function get(url, query) {
  return axios
  .get(url, query || '')
  .then(res => {
    if (res.status == 200) {
      return res.data
    } else {
      throw res.statusText
    }
  })
}

export function post(url, data) {
  return axios
  .post(url, data)
  .then(res => {
    if (res.status == 200) {
      return res.data
    } else {
      throw res.statusText
    }
  })
}