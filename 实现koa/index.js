const Emitter = require('events')
const http = require('http')
const { koaCompose2: compose } = require('../实现compose')

class Koa extends Emitter {
  constructor (options) {
    super()
    this.options = options
    this.middleware = []
    this.context = {}
    this.request = {}
    this.response = {}
  }

  use (fn) {
    this.middleware.push(fn)
  }

  createContext (request, response) {
    return { request, response }
  }

  callback () {
    const middlewareCompose = compose(this.middleware) // (ctx, next) => Promise
    const handleRequest = (request, response) => {
      const ctx = this.createContext(request, response)
      middlewareCompose(ctx)
    }
    return handleRequest
  }

  listen (...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }
}

module.exports = {
  Koa
}
