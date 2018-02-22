export default function (cb, wait) {
  let tiggered = false
  return function () {
    if (tiggered) return
    cb()
    tiggered = true
    setTimeout(() => {
      tiggered = false
    }, wait);
  }
}