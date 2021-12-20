const { debounce, throttle } = require('./index')

// 阀值设定
const threshold = 100

/**
 * 通过定时器模拟触发函数，通过count计数表示执行次数，1000 ms 后停止函数
 * @param {number} during 模拟触发函数时间间隔
 */
const runAdd = fn => during =>
  new Promise((resolve, reject) => {
    let count = 0
    const add = () => {
      count++
    }
    // debounce 阀值设置为 100
    const timer = setInterval(fn(add, threshold), during)
    setTimeout(() => {
      clearInterval(timer)
      resolve(count)
    }, 1000)
  })

test('test: debounce', async () => {
  const testDebounce = runAdd(debounce)
  const count50 = await testDebounce(50) // 永远不会执行
  const count250 = await testDebounce(250) // 执行时间（需要加上阀值延迟时间） 350， 600， 850
  const count300 = await testDebounce(300) // 执行时间（需要加上阀值延迟时间） 400， 700
  expect(count50).toBe(0)
  expect(count250).toBe(3)
  expect(count300).toBe(2)
})

test('test: throttle', async () => {
  const testThrottle = runAdd(throttle)
  const count10 = await testThrottle(10)
  const count220 = await testThrottle(220)
  const count300 = await testThrottle(300)
  expect(count10).toBe(10)
  expect(count220).toBe(4)
  expect(count300).toBe(3)
})
