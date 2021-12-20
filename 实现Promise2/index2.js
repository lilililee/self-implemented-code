/* eslint-disable promise/param-names */

// 参考资料： https://juejin.cn/post/6844903665686282253
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const notFunction = fn => typeof fn !== 'function'

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 300)
// }).then((res) => {
//   return 100
// }).catch
module.exports = class Promise {
  constructor (fn) {
    if (notFunction(fn)) throw new Error()
    this._status = PENDING
    this._value = undefined
    this._fulfilledCallbacks = []
    this._rejectedCallbacks = []
    try {
      fn(this._resolve.bind(this), this._rejected.bind(this))
    } catch (error) {
      this._rejected(error)
    }
  }

  _resolve (value) {
    if (this._status !== PENDING) return
    setTimeout(() => {
      this._status = FULFILLED
      this._value = value
      this._fulfilledCallbacks.forEach(cb => cb(value))
    })
  }

  _rejected (value) {
    if (this._status !== REJECTED) return
    setTimeout(() => {
      this._status = REJECTED
      this._value = value
      this._rejectedCallbacks.forEach(cb => cb(value))
    })
  }

  then (onFulfilled, onRejected) {
    return new Promise((onResolveNext, onRejectNext) => {
      const fulfilledCallback = (value) => {
        if (notFunction(onFulfilled)) {
          onResolveNext(value)
        } else {
          const res = onFulfilled(value)
          if (res instanceof Promise) {
            res.then(onResolveNext, onRejectNext)
          } else {
            onResolveNext(res)
          }
        }
      }

      const rejectedCallback = (value) => {
        if (notFunction(onRejected)) {
          onRejectNext(value)
        } else {
          const res = onRejected(value)
          if (res instanceof Promise) {
            res.then(onResolveNext, onRejectNext)
          } else {
            onResolveNext(value)
          }
        }
      }

      switch (this._status) {
        case PENDING:
          this._fulfilledCallbacks.push(fulfilledCallback)
          this._rejectedCallbacks.push(rejectedCallback)
          break
        case FULFILLED:
          fulfilledCallback(this._value)
          break
        case REJECTED:
          rejectedCallback(this._value)
          break
      }
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  finally (onDone) {
    return this.then(onDone, onDone)
  }

  static resolve (value) {
    // resolve 传入的是 Promsie， 则优先使用该 Promise
    if (value instanceof Promise) return value
    return new Promise(reolve => reolve(value))
  }
  static reject (value) {
    // reject 始终使用传入的值
    return new Promise((_, reject) => reject(value))
  }

  static all (promiseList) {
    return new Promise((resolve, reject) => {
      const values = []
      let count = 0
      promiseList.forEach((promise, index) => {
        promise.then(value => {
          values[index] = value
          count++
          count === promiseList.length && resolve(values)
        }, reject)
      })
    })
  }
  static race (promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((promise) => {
        promise.then(resolve, reject)
      })
    })
  }
}
