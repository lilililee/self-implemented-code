const { promisify } = require('./index')

const sleep = promisify((t, r) => setTimeout(r, t))

test('test: _new', async () => {
  // 返回 Promise 实例
  expect(sleep(100) instanceof Promise).toBeTruthy()

  // 功能测试
  const startDate = Date.now()
  await sleep(100)
  const endDate = Date.now()
  expect(endDate + 10 - 100 > startDate).toBeTruthy()// 10 ms 作为 setTimeout 允许的误差
})
