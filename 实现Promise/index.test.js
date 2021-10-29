const { _Promise } = require('./index')

// 方便切换 _Promise 和 原生 Promise 做对比
let __Promise = _Promise
// __Promise = Promise

const sleep = time => new __Promise(resolve => setTimeout(resolve, time))

test('test: _Promise', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0
  let flag4 = 0
  let flag5 = 0
  let flag6 = 0
  let flag7 = 0

  const p = new __Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 50)
  })
    // 测试是否能正确获取 resolve 传递的值
    .then(f => {
      flag1 = f // 1
      return 2
    })
    // 测试是否能正确获取上一个 then 返回值
    .then(f => {
      flag2 = f // 2
      return new __Promise((resolve, reject) => {
        resolve(3)
      })
    })
    // 测试是否能正确获取上一个 then 返回 Promise 中 resolve 的值
    .then(f => {
      flag3 = f // 3
      return 5
    })
    // 不会运行， flag4 值未改变
    .catch(f => {
      flag4 = f // 0
    })
    // 测试是否能跳过catch
    .then(f => {
      flag5 = f // 5
      return new __Promise((resolve, reject) => {
        reject(6)
      })
    })
    // 测试是否能正确获取上一个 then 返回 Promise 中 reject 的值
    .catch(f => {
      flag6 = f // 6
      return 7
    })
    // 测试是否能继续执行 catch 之后的 then（ catch 会将状态标记为 RESOLVED）
    .then(f => {
      flag7 = 7
    })
  expect(flag1 === 0).toBeTruthy()
  await sleep(100)
  expect(flag1 === 1).toBeTruthy()
  expect(flag2 === 2).toBeTruthy()
  expect(flag3 === 3).toBeTruthy()
  expect(flag4 === 0).toBeTruthy()
  expect(flag5 === 5).toBeTruthy()
  expect(flag6 === 6).toBeTruthy()
  expect(flag7 === 7).toBeTruthy()
})

test('test: _Promise.resolve', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0

  const p = _Promise
    .resolve(1)
    .then(f => {
      flag1 = f
      return 3
    })
    // 不会执行
    .catch(f => {
      flag2 = f
    })
    // 会跳过catch执行
    .then(f => {
      flag3 = f
    })
  expect(flag1 === 0).toBeTruthy()
  await sleep(100)
  expect(flag1 === 1).toBeTruthy()
  expect(flag2 === 0).toBeTruthy()
  expect(flag3 === 3).toBeTruthy()
})

test('test: _Promise.reject', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0
  let flag4 = 0

  const p = _Promise
    .reject(2)
    // 不会执行
    .then(f => {
      flag1 = f
    })
    .catch(f => {
      flag2 = f
      return 4
    })
    // 不会执行
    .catch(f => {
      flag3 = f
    })
    .then(f => {
      flag4 = f
    })
  expect(flag1 === 0).toBeTruthy()
  await sleep(100)
  expect(flag1 === 0).toBeTruthy()
  expect(flag2 === 2).toBeTruthy()
  expect(flag3 === 0).toBeTruthy()
  expect(flag4 === 4).toBeTruthy()
})

test('test: _Promise.all', async () => {
  let flag1 = 0
  const s1 = new _Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 100)
  })
  const s2 = new _Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 50)
  })
  const all = _Promise.all([s1, s2]).then(f => {
    flag1 = f
  })
  expect(flag1 === 0).toBeTruthy()
  await sleep(150)
  expect(flag1).toEqual([1, 2])
})

test('test: _Promise.race', async () => {
  let flag1 = 0
  const s1 = new _Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 100)
  })
  const s2 = new _Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 50)
  })
  const race = _Promise.race([s1, s2]).then(f => {
    flag1 = f
  })
  expect(flag1 === 0).toBeTruthy()
  await sleep(150)
  expect(flag1 === 2).toBeTruthy()
})
