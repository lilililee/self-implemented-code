// const curry = (fn, ...args1) => {
//   return (...args2) => {
//     if (args1.length + args2.length >= fn.length) {
//       return fn(...args1, ...args2)
//     } else {
//       return curry(fn, ...args1, ...args2)
//     }
//   }
// }

// 精简写法
const curry = (fn, ...args1) => (...args2) =>
  args1.length + args2.length >= fn.length ? fn(...args1, ...args2) : curry(fn, ...args1, ...args2)

module.exports = {
  curry
}
