const { _map, _filter } = require('./index')
Object.assign(Array.prototype, { _map, _filter })

const arr = [1, 2, 3]
test('test: _map & _filter & _apply', () => {
  expect(arr._map(i => i * 2)).toEqual([2, 4, 6])
  expect(arr._filter(i => i === 1)).toEqual([1])
})
