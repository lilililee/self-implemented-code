const { bubbleSort, bubbleSort2, bubbleSort3, bubbleSort4 } = require('./index')

const createList = n => new Array(n).fill(0).map(i => parseInt(Math.random() * 10000))

const sortList = arr => {
  console.time('bubbleSort(原生sort)')
  let count = 0
  const result = [...arr].sort((a, b) => {
    count++
    return a - b
  })
  console.timeEnd('bubbleSort(原生sort)')
  console.log('count(原生sort)', count)
  return result
}

const randomList = createList(5000)
const sortResult = sortList(randomList) //               15ms  60354

test('test: bubbleSort', () => {
  expect(bubbleSort(randomList)).toEqual(sortResult) //  117ms 12497500
  expect(bubbleSort2(randomList)).toEqual(sortResult) // 95ms  12497500
  expect(bubbleSort3(randomList)).toEqual(sortResult) // 151ms 12487189
  expect(bubbleSort4(randomList)).toEqual(sortResult) // 84ms  8418828
})
