const Promise = require('./index3')

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

test.only('test:Promise', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0
  let flag4 = 0
  let flag5 = 0
  let flag6 = 0
  let flag7 = 0

  // const pt = new Promise((resolve, reject) => {
  //   resolve(1)
  // })
  //   .then((res) => {
  //     console.log('res1: ', res)
  //     return new Promise((resolve, reject) => {
  //       resolve(3)
  //     })
  //   })
  //   .catch((res) => {
  //     console.log('res2: ', res)
  //   })
  //   .then((res) => {
  //     console.log('res3: ', res)
  //   })
  // await sleep(500)
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 50)
  })
    // 测试是否能正确获取 resolve 传递的值
    .then((f) => {
      flag1 = f // 1
      return 2
    })
    // 测试是否能正确获取上一个 then 返回值
    .then((f) => {
      flag2 = f // 2
      return new Promise((resolve, reject) => {
        resolve(3)
      })
    })
    // 测试是否能正确获取上一个 then 返回 Promise 中 resolve 的值
    .then((f) => {
      flag3 = f // 3
      return 5
    })
    // 不会运行， flag4 值未改变
    .catch((f) => {
      flag4 = f // 0
      console.log('flag4: ', flag4)
    })
    // 测试是否能跳过catch
    .then((f) => {
      console.log('f: ', f)
      flag5 = f // 5
      return new Promise((resolve, reject) => {
        reject(6)
      })
    })
    // 测试是否能正确获取上一个 then 返回 Promise 中 reject 的值
    .catch((f) => {
      flag6 = f // 6
      return 7
    })
    // 测试是否能继续执行 catch 之后的 then（ catch 会将状态标记为 RESOLVED）
    .then((f) => {
      flag7 = 7
    })
  expect(flag1).toBe(0)
  await sleep(100)
  expect(flag1).toBe(1)
  expect(flag2).toBe(2)
  expect(flag3).toBe(3)
  expect(flag4).toBe(0)
  expect(flag5).toBe(5)
  expect(flag6).toBe(6)
  expect(flag7).toBe(7)
})

test('test:Promise.resolve', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0

  const p = Promise.resolve(1)
    .then((f) => {
      flag1 = f
      return 3
    })
    // 不会执行
    .catch((f) => {
      flag2 = f
    })
    // 会跳过catch执行
    .then((f) => {
      flag3 = f
    })
  expect(flag1).toBe(0)
  await sleep(100)
  expect(flag1).toBe(1)
  expect(flag2).toBe(0)
  expect(flag3).toBe(3)
})

test('test:Promise.reject', async () => {
  let flag1 = 0
  let flag2 = 0
  let flag3 = 0
  let flag4 = 0

  const p = Promise.reject(2)
    // 不会执行
    .then((f) => {
      flag1 = f
    })
    .catch((f) => {
      flag2 = f
      return 4
    })
    // 不会执行
    .catch((f) => {
      flag3 = f
    })
    .then((f) => {
      flag4 = f
    })
  expect(flag1).toBe(0)
  await sleep(100)
  expect(flag1).toBe(0)
  expect(flag2).toBe(2)
  expect(flag3).toBe(0)
  expect(flag4).toBe(4)
})

test('test:Promise.all', async () => {
  let flag1 = 0
  let flag2 = 0
  const s1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 100)
  })
  const s2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 50)
  })
  const all = Promise.all([s1, s2]).then((f) => {
    flag1 = f
  })
  Promise.all([Promise.reject(1)]).catch((f) => {
    flag2 = f
  })
  expect(flag1).toBe(0)
  expect(flag2).toBe(0)
  await sleep(150)
  expect(flag1).toEqual([1, 2]) // 按数组顺序
  expect(flag2).toBe(1) // 按数组顺序
})

test('test:Promise.race', async () => {
  let flag1 = 0
  const s1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(1)
    }, 100)
  })
  const s2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(2)
    }, 50)
  })
  const race = Promise.race([s1, s2]).then((f) => {
    flag1 = f
  })
  expect(flag1).toBe(0)
  await sleep(150)
  expect(flag1).toBe(2)
})
