const { _instanceof } = require('./index')

function Dog (name) {
  this.name = name
}

const wangcai = new Dog()

test('test: _new', () => {
  // 错误参数测试
  expect(_instanceof(1, Object)).toBeFalsy()
  expect(_instanceof({}, 1)).toBeFalsy()

  // 功能测试
  expect(_instanceof({}, Object)).toBeTruthy()
  expect(_instanceof(wangcai, Dog)).toBeTruthy()
  expect(_instanceof(wangcai, Object)).toBeTruthy()
})
