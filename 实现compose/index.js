const compose = (...fns) => (args) => fns.reduce((prev, fn) => fn(prev), args)

// 自己实现版本
const koaCompose = (middlewares) => (ctx) => new Promise(async (resolve, reject) => {
  if (!middlewares.length) return
  const fns = [() => {}]
  for (let i = middlewares.length - 1; i >= 0; i--) {
    fns.unshift(middlewares[i].bind(null, ctx, fns[0]))
  }
  try {
    await fns[0]()
    resolve()
  } catch (error) {
    reject(error)
  }
})

// 官方实现版
// 调用示例
// const app = new Koa()
// app.use(async (ctx, next) => {
//   console.log('start-1')
//   await next()
//   console.log('end-1')
// })
// app.use(async (ctx, next) => {
//   console.log('start-2')
//   await next()
//   console.log('end-3')
// })

const koaCompose2 = (middlewares) => {
  return (ctx, next) => {
    // let index = -1
    return dispatch(0)

    function dispatch (i) {
      // if (i <= index) throw new Error('重复调用')
      // index = i
      let fn = middlewares[i]
      if (i === middlewares.length) fn = next
      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

module.exports = {
  compose,
  koaCompose,
  koaCompose2
}
