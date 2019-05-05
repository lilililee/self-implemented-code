const { countSort } = require('./index')

const createList = n => new Array(n).fill(0).map(i => parseInt(Math.random() * 10000))

const sortList = arr => {
  console.time('quickSort(原生sort)')
  let count = 0
  const result = [...arr].sort((a, b) => {
    count++
    return a - b
  })
  console.timeEnd('quickSort(原生sort)')
  console.log('count(原生sort)', count)
  return result
}

const randomList = createList(100000)
const sortResult = sortList(randomList) //                  11ms 60427

test('test: quickSort', () => {
  expect(countSort(randomList)).toEqual(sortResult) //  30ms 12497500
})
