// 链接： https://juejin.im/post/57dcd394a22b9d00610c5ec8

function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 选择排序，基础
function selectionSort (_arr) {
  console.time('selectionSort(基础)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1
  let count = 0
  while (i > 0) {
    let maxIndex = 0
    // 默认下标 0 为最大值，所以 for 可以跳过下标 0
    for (let j = 1; j <= i; j++) {
      count++
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    swap(arr, maxIndex, i)
    i--
  }
  console.timeEnd('selectionSort(基础)')
  console.log('count(基础)', count)
  return arr
}

// 选择排序，双向
function selectionSort2 (_arr) {
  console.time('selectionSort2(双向)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1
  let count = 0
  while (i >= len / 2) {
    let maxIndex = len - 1 - i
    let minIndex = len - 1 - i
    for (let j = len - i; j <= i; j++) {
      count++
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    swap(arr, maxIndex, i)
    for (let j = len - i; j <= i - 1; j++) {
      count++
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    swap(arr, minIndex, len - 1 - i)
    i--
  }
  console.timeEnd('selectionSort2(双向)')
  console.log('count(双向)', count)
  return arr
}

module.exports = {
  selectionSort,
  selectionSort2
}
