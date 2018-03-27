export default function (cb, wait, keep) {
  if (typeof cb != 'function' || typeof wait != 'number' || typeof keep != 'boolean') {
    console.error(new Error('debounce([function], [number], [boolean])'))
    return () => {}
  }
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