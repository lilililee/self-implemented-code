const { compose, koaCompose, koaCompose2 } = require('./index')
const { delay } = require('../utils/index')

function fn1 (x) {
  return x + 1
}
function fn2 (x) {
  return x + 2
}
function fn3 (x) {
  return x + 3
}
function fn4 (x) {
  return x + 4
}

async function koaFn1 (ctx, next) {
  console.log('koaFn1 start')
  ctx.count++
  await delay(100)
  await next()
  await delay(100)
  ctx.count++
  console.log('koaFn1 end')
}

async function koaFn2 (ctx, next) {
  console.log('koaFn2 start')
  ctx.count++
  await delay(100)
  await next()
  await delay(100)
  ctx.count++
  console.log('koaFn2 end')
}

async function koaFn3 (ctx, next) {
  console.log('koaFn3 start')
  ctx.count++
  await delay(100)
  await next()
  await delay(100)
  ctx.count++
  console.log('koaFn3 end')
}

test('test: compose', () => {
  const a = compose(fn1, fn2, fn3, fn4)
  expect(a(1)).toEqual(11)
})

// test('test: koaCompose', async () => {
//   const ctx = {
//     count: 0
//   }
//   const middlewares = [koaFn1, koaFn2, koaFn3]
//   const fnMiddleware = koaCompose(middlewares)
//   await fnMiddleware(ctx)
//   expect(ctx.count).toEqual(6)
// })

test('test: koaCompose2', async () => {
  const ctx = {
    count: 0
  }
  const middlewares = [koaFn1, koaFn2, koaFn3]
  const fnMiddleware = koaCompose2(middlewares)
  await fnMiddleware(ctx)
  expect(ctx.count).toEqual(6)
})
