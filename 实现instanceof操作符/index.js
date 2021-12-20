/* eslint-disable no-proto */
function _instanceof (obj, constructor) {
  if (typeof obj !== 'object' || obj === null) return false
  if (typeof constructor !== 'function') return false

  let proto = obj.__proto__
  while (proto) {
    if (proto.constructor === constructor) return true
    proto = proto.__proto__
  }
}

module.exports = {
  _instanceof
}
