export default function (cb, wait) {
  let tiggered = false
  let timeout
  return function () {
    // 确保结束后还执行一次
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb()
    }, 50)
    if (tiggered) return
    cb()
    tiggered = true
    setTimeout(() => {
      tiggered = false
    }, wait);
  }
}