function handleReturnPromise(_this, returnPromise, index) {
  _this.origin.PromiseStatus = returnPromise.PromiseStatus
  _this.origin.PromiseValue = returnPromise.PromiseValue
  returnPromise._thenAndCatch = returnPromise._thenAndCatch.concat(_this._thenAndCatch.slice(index + 1))
  returnPromise.origin = _this
}

function doRejectCallback(_this) {
  _this._thenAndCatch.some(function(thenResolveFn, index) {
    if (thenResolveFn.type !== 'catch') return false
    var thenOrReturn = thenResolveFn.callback(_this.PromiseValue)
    if (thenOrReturn instanceof _Promise) {
      handleReturnPromise(_this, thenOrReturn, index)
    } else {
      _this.PromiseStatus = RESOLVED // catch 执行后状态改为 RESOLVED
      _this.PromiseValue = thenOrReturn
      _this.origin.PromiseValue = thenOrReturn
      _this._thenAndCatch = _this._thenAndCatch.slice(index + 1)
      doResolveCallback(_this) // 并且执行后续的所有 then
    }
    return true
  })
}

function doResolveCallback(_this) {
  _this._thenAndCatch.some(function(thenResolveFn, index) {
    if (thenResolveFn.type !== 'then') return false
    var thenOrReturn = thenResolveFn.callback(_this.PromiseValue)
    if (thenOrReturn instanceof _Promise) {
      handleReturnPromise(_this, thenOrReturn, index)
      return true
    } else {
      _this.PromiseValue = thenOrReturn
      _this.origin.PromiseValue = thenOrReturn
    }
  })
  _this._thenAndCatch = []
}
var PENDING = 'pending'
// var FULFILLED = 'fulfilled'
var RESOLVED = 'resolved'
var REJECTED = 'rejected'
var count = 0
function _Promise(fn) {
  if (this instanceof _Promise === false) {
    throw new TypeError("Please use the 'new' operator")
  }
  if (typeof fn !== 'function') {
    throw new TypeError(`_Promise resolver ${fn} is not a function`)
  }
  this.count = count++
  this.PromiseStatus = PENDING // _Promise状态
  this.PromiseValue = undefined // _Promise值
  this.origin = this // 最初调用的 _Promise ， 如果在then中return了新的 _Promise ，会根据该字段修改覆盖原先 _Promise
  this._thenAndCatch = [] // 保存 then 和 catch 传递的函数, catch运行后会把状态调整为 RESOLVED

  fn(this.resolve.bind(this), this.reject.bind(this))
  return this // 支持 then 链式调用
}

_Promise.prototype.then = function(thenResolveFn) {
  this._thenAndCatch.push({
    type: 'then',
    callback: thenResolveFn
  })
  if (this.PromiseStatus === RESOLVED) {
    doResolveCallback(this)
  }
  return this
}

_Promise.prototype.catch = function(thenResolveFn) {
  this._thenAndCatch.push({
    type: 'catch',
    callback: thenResolveFn
  })
  if (this.PromiseStatus === REJECTED) {
    doRejectCallback(this)
  }
  return this
}

_Promise.prototype.resolve = function(arg) {
  var _this = this
  setTimeout(function() {
    _this.PromiseStatus = RESOLVED
    _this.PromiseValue = arg
    if (_this !== _this.origin) {
      _this.origin.PromiseStatus = RESOLVED
      _this.origin.PromiseValue = arg
    }
    doResolveCallback(_this)
  })
}

_Promise.prototype.reject = function(arg) {
  var _this = this
  setTimeout(function() {
    _this.PromiseStatus = RESOLVED
    _this.PromiseValue = arg
    if (_this !== _this.origin) {
      _this.origin.PromiseStatus = RESOLVED
      _this.origin.PromiseValue = arg
    }
    doRejectCallback(_this)
  })
}

_Promise.resolve = function(arg) {
  return new _Promise(function(resolve, reject) {
    resolve(arg)
  })
}

_Promise.reject = function(arg) {
  return new _Promise(function(resolve, reject) {
    reject(arg)
  })
}

_Promise.all = function(arg) {
  if (!Array.isArray(arg)) {
    throw new TypeError('You must pass an array to Promise.all().')
  }
  return new _Promise(function(resolve, reject) {
    var count = 0
    var result = []
    function doCount(res) {
      count++
      if (count === arg.length) {
        resolve(
          arg.map(function(p) {
            return p.PromiseValue
          })
        )
      }
      return res
    }
    arg.forEach(function(p) {
      p.then(doCount)
    })
  })
}

_Promise.race = function(arg) {
  if (!Array.isArray(arg)) {
    throw new TypeError('You must pass an array to Promise.all().')
  }
  var p = new _Promise(function(resolve, reject) {
    var count = 0
    var result = []
    function doCount(res) {
      if (p.PromiseStatus === PENDING) {
        resolve(res)
      }
      return res
    }
    arg.forEach(function(p) {
      p.then(doCount)
    })
  })
  return p
}

// test
/*
const p = _Promise
// const p = Promise

// all, race 测试
const s2 = new p(resolve => {
  setTimeout(() => {
    resolve(2)
  }, 100)
})
const s1 = new p(resolve => {
  setTimeout(() => {
    resolve(1)
  }, 200)
})
const all = p.all([s1, s2])
const race = p.race([s1, s2])
setTimeout(() => {
  console.log('all', all)
  console.log('race', race)
}, 2000)
// 输出
// all, _Promise{ PromiseStatus: "resolved", PromiseValue: [1, 2] }
// race, _Promise{ PromiseStatus: "resolved", PromiseValue: 2 }

// then, catch 测试
const a = new p((r, j) => {
  console.log('Promise start')
  r(111)
})
  .then(res => {
    console.log('fn1 res', res)
  })
  .then(res => {
    console.log('fn2 res', res)
    return new p((r, j) => {
      console.log('Promise2 start')
      j(222)
    })
  })
  .catch(res => {
    console.log('fn3 res', res)
    return 333
  })
  .catch(res => {
    console.log('fn4 res', res)
    return 444
  })
  .then(res => {
    console.log('fn5 res', res)
    return 555
  })

console.log('Promise end')

// 输出
// Promise start
// Promise end
// fn1 res 111
// fn2 res undefined
// Promise2 start
// fn3 res 222
// fn5 res 333

*/