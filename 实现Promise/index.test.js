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

  const p = new __Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 50)
  })
    .then(f => {
      flag1 = f // 1
      return 2
    })
    .then(f => {
      flag2 = f // 2
      return new __Promise((resolve, reject) => {
        resolve(3)
      })
    })
    .then(f => {
      flag3 = f // 3
      return 5
    })
    // 不会运行， flag4 值未改变
    .catch(f => {
      flag4 = f // 0
    })
    .then(f => {
      flag5 = f // 5
      return new __Promise((resolve, reject) => {
        reject(6)
      })
    })
    .catch(f => {
      flag6 = f // 6
    })
  expect(flag1 === 0).toBeTruthy()
  await sleep(100)
  expect(flag1 === 1).toBeTruthy()
  expect(flag2 === 2).toBeTruthy()
  expect(flag3 === 3).toBeTruthy()
  expect(flag4 === 0).toBeTruthy()
  expect(flag5 === 5).toBeTruthy()
  expect(flag6 === 6).toBeTruthy()
})

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


