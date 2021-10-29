const { PubSub } = require('./index')

let result = []
const cb1 = arg => {
  result.push('run cb1:' + arg)
  // console.log('run cb1:', arg)
}
const cb2 = arg => {
  result.push('run cb2:' + arg)
  // console.log('run cb2:', arg)
}

const p = new PubSub()
p.on('myEvent', cb1)
p.on('myEvent', cb2)
p.emit('myEvent', 'test')

test('test: PubSub', () => {
  expect(result).toEqual(['run cb1:test', 'run cb2:test'])

  // 移除事件 cb1 并重置结果
  p.off('myEvent', cb1)
  result = []
  p.emit('myEvent', 'test')
  expect(result).toEqual(['run cb2:test'])
})
