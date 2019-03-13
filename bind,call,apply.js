Function.prototype._bind = function(context) {
  return (...args) => {
    context._forBind = this
    const result = context._forBind(...args)
    delete context._forBind
    return result
  }
}
Function.prototype._call = function(context, ...args) {
  return this._bind(context)(...args)
}
Function.prototype._apply = function(context, args) {
  return this._bind(context)(args)
}

// test
/* 
const a = { a: 1, b: 2 }
const log = function(p) {
  console.log(p)
  return this.b
}
log._bind(a, 33)()    // undefined  return 2
log._call(a, 33)      // 33         return 2
log._apply(a, [33])   // [33]       return 2
*/