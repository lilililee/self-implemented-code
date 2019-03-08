const debounce = (fn, time = 600) => {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

const throttle = (fn, time = 600) => {
  let startTime = 0
  return (...args) => {
    const now = Date.now()
    if (now - startTime > time) {
      fn.apply(this, args)
      startTime = now
    }
  }
}