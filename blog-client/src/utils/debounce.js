export default function (cb, wait, keep = false) {
  let timeout
  return function (...args) {
    let target
    if (keep) {
      target = args[0].target
    }
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (keep) {
        cb(target)
      } else {
        cb(...args)
      }
    }, wait)
  }
}