const cloneDeep = require('./')

// 原始对象
const source = {
  string: 'string',
  number: 123,
  boolean: true,
  undefined: undefined,
  null: null,
  symbol: Symbol('aa'),
  function: function () {},
  regexp: /^hello$/,
  object: { a: 1, b: '2' },
  array: [3, '4']
}

// 克隆对象
const cloneSource = cloneDeep(source)

test('test: cloneDeep', () => {
  // 顶层引用对比
  expect(source !== cloneSource).toBeTruthy()

  // 基础属性对比
  expect(source.string === cloneSource.string).toBeTruthy()
  expect(source.number === cloneSource.number).toBeTruthy()
  expect(source.boolean === cloneSource.boolean).toBeTruthy()
  expect(source.undefined === cloneSource.undefined).toBeTruthy()
  expect(source.null === cloneSource.null).toBeTruthy()
  expect(source.symbol === cloneSource.symbol).toBeTruthy()
  expect(source.function === cloneSource.function).toBeTruthy()
  expect(source.regexp === cloneSource.regexp).toBeTruthy()

  // 深层引用对比
  expect(source.object !== cloneSource.object).toBeTruthy()
  expect(source.array !== cloneSource.array).toBeTruthy()
  expect(source.object).toEqual(cloneSource.object)
  expect(source.array).toEqual(cloneSource.array)
})
