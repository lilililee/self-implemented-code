module.exports = class Promise {
  constructor(fn) {
    this.state = 'pending'
    this.value = null
    this.callbacks = []
    fn(this._resolve.bind(this), this._reject.bind(this))
  }

  then(resolve = null, reject = null) {
    return new Promise((nextResolve, nextReject) => {
      this._handle({
        resolve,
        reject,
        nextResolve,
        nextReject,
      })
    })
  }
  catch(reject = null) {
    return this.then(null, reject)
  }
  finally(onDone) {
    return this.then(onDone, onDone)
  }

  _resolve(value) {
    if (this.state !== 'pending') return
    // 保证 then 比 resolve 先运行
    setTimeout(() => {
      this.state = 'fulfilled'
      this.value = value
      this.callbacks.forEach(this._handle.bind(this))
    })
  }
  _reject(value) {
    if (this.state !== 'pending') return
    // 保证 then 比 resolve 先运行
    setTimeout(() => {
      this.state = 'rejected'
      this.value = value
      this.callbacks.forEach(this._handle.bind(this))
    })
  }

  _handle(callback) {
    const { resolve, reject, nextResolve, nextReject } = callback

    switch (this.state) {
      case 'pending':
        this.callbacks.push(callback)
        break
      case 'fulfilled':
        if (resolve) {
          const resolveReturn = resolve(this.value)
          if (resolveReturn instanceof Promise) {
            resolveReturn.then(nextResolve, nextReject)
          } else {
            nextResolve(resolveReturn)
          }
        } else {
          nextResolve(this.value)
        }
        break
      case 'rejected':
        if (reject) {
          const rejectReturn = reject(this.value)
          if (rejectReturn instanceof Promise) {
            rejectReturn.then(nextResolve, nextReject)
          } else {
            nextResolve(rejectReturn)
          }
        } else {
          nextReject(this.value)
        }
    }
  }

  static resolve(value) {
    return new Promise((resolve) => resolve(value))
  }

  static reject(value) {
    return new Promise((_, reject) => reject(value))
  }

  static all(promiseList) {
    return new Promise((resolve, reject) => {
      const values = []
      promiseList.forEach((p) => {
        p.then((value) => {
          values.push(value)
          if (values.length === promiseList.length) {
            resolve(promiseList.map((p) => p.value))
          }
        }, reject)
      })
    })
  }

  static race(promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((p) => {
        p.then(resolve, reject)
      })
    })
  }
}
