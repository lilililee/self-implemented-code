exports.debounce = (fn, time) => {
  let timer = 0
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}

exports.throttle = (fn, time) => {
  let t = 0
  return function (...args) {
    const now = Date.now()
    if (now - t > time) {
      t = now
      fn(...args)
    }
  }
}
