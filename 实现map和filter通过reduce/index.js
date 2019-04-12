// 需要将下面方便绑定到 Function.prototype 测试
function _map (fn) {
  return this.reduce((result, item) => [...result, fn(item)], [])
}
function _filter (fn) {
  return this.reduce((result, item) => (fn(item) ? [...result, item] : result), [])
}

module.exports = {
  _map,
  _filter
}
