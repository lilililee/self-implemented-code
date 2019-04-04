function isType (target, type) {
  return Object.prototype.toString.call(target).slice(8, -1) === type
}

function cloneDeep (obj) {
  if (!isType(obj, 'Object') && !isType(obj, 'Array')) return obj
  var res = isType(obj, 'Array') ? [] : {}
  for (var key in obj) {
    res[key] = cloneDeep(obj[key])
  }
  return res
}

module.exports = cloneDeep
