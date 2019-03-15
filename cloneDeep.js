function isType(target, type) {
  return Object.prototype.toString.call(target).slice(8, -1) === type
}

function cloneDeep(obj) {
  if (!isType(obj, 'Object') && !isType(obj, 'Array')) return obj
  var res = isType(obj, 'Array') ? [] : {}
  for (var key in obj) {
    res[key] = cloneDeep(obj[key])
  }
  return res
}

// test
/* 
var obj = { a: 1, b: '2' }
var arr = [3, '4']

var source = {
  string: 'string',
  number: 123,
  boolean: true,
  undefined: undefined,
  null: null,
  symbol: Symbol('aa'),
  object: obj,
  array: arr,
  function: function() {},
  regexp: /^hello$/
}

var clone = cloneDeep(source)

console.log(clone)
console.log('source compare:', source === clone) // false
console.log('object compare:', obj === clone.object) // false
console.log('array compare:', arr === clone.array) // false

*/
