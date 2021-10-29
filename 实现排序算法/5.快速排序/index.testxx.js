const { quickSort, quickSort2 } = require('./index')

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
  console.time('quickSort(quickSort)')
  const quickSortResult = quickSort(randomList)
  console.timeEnd('quickSort(quickSort)')
  expect(quickSortResult).toEqual(sortResult) //  30ms 12497500
  // expect(quickSort2(randomList)).toEqual(sortResult) // 29ms 12497500
})
