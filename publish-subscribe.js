function PubSub() {
  this.sub = {}
}

PubSub.prototype.on = function(event, callback) {
  if (this.sub[event] === undefined) this.sub[event] = []
  this.sub[event].push(callback)
}

PubSub.prototype.off = function(event, callback) {
  if (this.sub[event] === undefined) return
  const index = this.sub[event].indexOf(callback)
  if (index > -1) this.sub[event].splice(index, 1)
  if (this.sub[event].length === 0) delete this.sub[event]
}

PubSub.prototype.emit = function(event, ...args) {
  if (this.sub[event] === undefined) return
  this.sub[event].forEach(callback => callback.apply(null, args))
}

// test
/*
var cb1 = arg => {
  console.log('run cb1:', arg)
}
var cb2 = arg => {
  console.log('run cb2:', arg)
}

p = new PubSub()
p.on('myEvent', cb1)
p.on('myEvent', cb2)

p.emit('myEvent', 'emit first') // run cb1: emit first   run cb2: emit first
p.off('myEvent', cb1)
p.emit('myEvent', 'emit again') // run cb2: emit again

*/
