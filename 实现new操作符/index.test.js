const { _new } = require('./index')

function Dog (name) {
  this.name = name
}

function Dog2 (name) {
  this.name = name
  return {
    name: 'wangwang'
  }
}

test('test: _new', () => {
  expect(_new(Dog, 'wangcai')).toEqual({ name: 'wangcai' })
  expect(_new(Dog2, 'wangcai')).toEqual({ name: 'wangwang' })
})
