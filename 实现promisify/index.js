const promisify = fn => (...args) => new Promise((resolve, reject) => fn(...args, resolve, reject))

module.exports = {
  promisify
}
