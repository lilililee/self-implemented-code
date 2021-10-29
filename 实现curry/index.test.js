const { curry } = require('./index')

const abc = (a, b, c) => [a, b, c]
const curried = curry(abc)

test('test: curry', () => {
  expect(curry(abc, 1, 2, 3)()).toEqual([1, 2, 3])
  expect(curry(abc, 1, 2)(3)).toEqual([1, 2, 3])
  expect(curry(abc, 1)(2, 3)).toEqual([1, 2, 3])

  expect(curried(1)(2)(3)).toEqual([1, 2, 3])
  expect(curried(1, 2)(3)).toEqual([1, 2, 3])
  expect(curried(1, 2, 3)).toEqual([1, 2, 3])
})
