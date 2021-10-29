// 链接： https://juejin.im/post/57dcd394a22b9d00610c5ec8

function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 快速排序，基础
function quickSort (_arr) {
  // console.time('quickSort(基础)')
  const arr = [..._arr]
  if (arr.length <= 1) return arr
  const reference = arr[0]
  const left = []
  const right = []
  const len = arr.length
  let i = 1
  let count = 0
  while (i < len) {
    if (arr[i] < reference) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
    i++
  }
  return quickSort(left).concat(reference, quickSort(right))
}

// 快速排序，双向
// @TODO
function quickSort2 (_arr, _left, _right) {
  // console.time('quickSort(基础)')
  const arr = [..._arr]
  if (arr.length <= 1) return arr
  const reference = arr[0]
  const left = []
  const right = []
  const len = arr.length
  let i = 1
  // let count = 0
  while (i < len) {
    if (arr[i] < reference) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
    i++
  }
  // console.timeEnd('quickSort(基础)')
  // console.log('count(基础)', count)
  return [...quickSort(left), reference, ...quickSort(right)]
}

module.exports = {
  quickSort,
  quickSort2
}
