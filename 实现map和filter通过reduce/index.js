// 需要将下面方便绑定到 Function.prototype 测试
function _map (fn, ctx = null) {
  return this.reduce((result, item) => [...result, fn.call(ctx, item)], [])
}
function _filter (fn, ctx = null) {
  return this.reduce((result, item) => (fn.call(ctx, item) ? [...result, item] : result), [])
}

module.exports = {
  _map,
  _filter
}
