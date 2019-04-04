
const { _bind, _call, _apply } = require('./index')
Object.assign(Function.prototype, { _bind, _call, _apply })

function introduce (age, height) {
  return `${this.name} / ${age} years old / ${height} cm`
}

const people = {
  name: 'xiaoming'
}

test('test: _bind & _call & _apply', () => {
  expect(introduce._bind(people)('18', '170')).toBe('xiaoming / 18 years old / 170 cm')
  expect(introduce._call(people, '18', '170')).toBe('xiaoming / 18 years old / 170 cm')
  expect(introduce._apply(people, ['18', '170'])).toBe('xiaoming / 18 years old / 170 cm')
})
