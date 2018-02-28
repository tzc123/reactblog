export default function (cb, wait, endTigger = false) {
  let tiggered = false
  let timeout
  return function (...args) {
    if (endTigger) {
       // 确保结束后还执行一次
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, wait)
    }
    if (tiggered) return
    cb(...args)
    tiggered = true
    setTimeout(() => {
      tiggered = false
    }, wait);
  }
}