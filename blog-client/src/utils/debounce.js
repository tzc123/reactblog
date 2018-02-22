export default function (cb, wait) {
  let timeout
  return function () {
    timeout && clearTimeout(timeout)
    setTimeout(() => {
      cb()
    }, wait)
  }
}