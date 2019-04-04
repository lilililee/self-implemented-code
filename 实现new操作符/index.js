function _new (fn, ...arg) {
  const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, arg)
  // 如果fn有返回Object，那么new返回的是该对象
  return ret instanceof Object ? ret : obj
}

module.exports = {
  _new
}
