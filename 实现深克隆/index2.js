
function cloneDeep (target, cache = new WeakSet()) {
  if (typeof target !== 'object' || target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)
  if (cache.has(target)) return target

  let res = Array.isArray(target) ? [] : {}
  for (let key in target) {
    res[key] = cloneDeep(target[key], cache)
  }
  cache.add(target)
  return res
}

module.exports = cloneDeep
