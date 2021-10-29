// 需要将下面方便绑定到 Function.prototype 测试
function _bind (context) {
  return (...args) => {
    context._forBind = this
    const result = context._forBind(...args)
    delete context._forBind
    return result
  }
}
function _call (context, ...args) {
  return this._bind(context)(...args)
}
function _apply (context, args) {
  return this._bind(context)(...args)
}

module.exports = {
  _bind,
  _call,
  _apply
}
