const _changeProgress = (rate) => require('../stores/header').default.changeProgress(rate)
require('es6-promise').polyfill()
import axios from 'axios'

const isNode = typeof window === 'undefined'
const changeProgress = isNode 
? () => {}
: _changeProgress

const http = axios.create({
  onDownloadProgress: e => changeProgress(e.loaded / e.total)
})

const directives = {}
function preventRepeate(url) {
  if (directives[url]) {
    directives[url]('repeated operation: cancel last operation')
  }
  const source = axios.CancelToken.source()
  directives[url] = source.cancel
  return source.token
}

http.defaults.withCredentials = true
http.defaults.baseURL = process.env.DEV == 'local'
? 'http://localhost:4321'
: 'http://122.152.205.25:4321'

http.interceptors.request.use(req => {
  const token = preventRepeate(req.url)
  changeProgress(0.1)
  return req
})

http.interceptors.response.use(res => {
  if (res.status === 200) {
    if (res.data.success) {
      return Promise.resolve(res.data.data)
    } else {
      const msg = res.data.msg || '未知错误'
      return Promise.reject(msg)
    }
  } else {
    const msg = config.api.errMessage[res.status]
    Message.error(msg)
    return Promise.reject(msg)
  }
}, err => {
  let msg = ''
  if (!err.response) {
    console.log(err)
    msg = '网络连接异常'
    return Promise.reject(msg)
  }
  if (
    err.response.data
    && err.response.data.errormsg
  ) {
    msg = err.response.data.errormsg
  } else {
    msg = config.api.errMessage[err.response.status]
  }
  return Promise.reject(msg)
})

export default http

