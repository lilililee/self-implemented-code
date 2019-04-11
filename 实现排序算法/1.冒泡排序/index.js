// 链接： https://juejin.im/post/57dcd394a22b9d00610c5ec8

function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 冒泡排序，基础
function bubbleSort (_arr) {
  console.time('bubbleSort(基础)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1 // 最大的放最后， i 代表已排好的位置
  let count = 0
  while (i > 0) {
    // console.log(arr)
    for (let j = 0; j < i; j++) {
      count++
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
    i--
  }
  console.timeEnd('bubbleSort(基础)')
  console.log('count(基础)', count)
  return arr
}

// 冒泡排序，双向
function bubbleSort2 (_arr) {
  console.time('bubbleSort2(双向)')
  const arr = [..._arr]
  const len = arr.length
  let start = 0
  let end = len - 1
  let count = 0
  while (start < end) {
    for (let j = start; j < end; j++) {
      count++
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
    end--
    for (let j = end - 1; j >= start; j--) {
      count++
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
    start++
  }
  console.timeEnd('bubbleSort2(双向)')
  console.log('count(双向)', count)
  return arr
}
// 冒泡排序，缓存位置
function bubbleSort3 (_arr) {
  console.time('bubbleSort3(缓存位置)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1
  let count = 0
  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      count++
      if (arr[j] > arr[j + 1]) {
        pos = j
        swap(arr, j, j + 1)
      }
    }
    i = pos
  }
  console.timeEnd('bubbleSort3(缓存位置)')
  console.log('count(缓存位置)', count)
  return arr
}
// 冒泡排序，双向+缓存位置
function bubbleSort4 (_arr) {
  console.time('bubbleSort4(双向+缓存位置)')
  const arr = [..._arr]
  const len = arr.length
  let start = 0
  let end = len - 1
  let count = 0
  while (start < end) {
    let posStart = 0
    let posEnd = end
    for (let j = start; j < end; j++) {
      count++
      if (arr[j] > arr[j + 1]) {
        posStart = j
        swap(arr, j, j + 1)
      }
    }
    end = posStart
    for (let j = end - 1; j >= start; j--) {
      count++
      if (arr[j] > arr[j + 1]) {
        posEnd = j
        swap(arr, j, j + 1)
      }
    }
    start = posEnd
  }
  console.timeEnd('bubbleSort4(双向+缓存位置)')
  console.log('count(双向+缓存位置)', count)
  return arr
}

module.exports = {
  bubbleSort,
  bubbleSort2,
  bubbleSort3,
  bubbleSort4
}
