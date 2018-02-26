export default function (cb, wait) {
  let timeout
  return function (...args) {
    timeout && clearTimeout(timeout)
    setTimeout(() => {
      cb(...args)
    }, wait)
  }
}