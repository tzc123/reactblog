export default function (cb, wait) {
  let tiggered = false
  let timeout
  return function () {
    // 确保结束后还执行一次
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      console.log('last')
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