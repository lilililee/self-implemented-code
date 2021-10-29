// 链接： https://juejin.im/post/57dcd394a22b9d00610c5ec8

function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 选择排序，基础
function insertionSort (_arr) {
  console.time('insertionSort(基础)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1
  let count = 0
  while (i > 0) {
    // 默认最后一个数为最大值,取前一个数为插入值做比较
    let now = arr[i - 1]
    let j = i
    while (j < len && now > arr[j]) {
      arr[j - 1] = arr[j]
      j++
    }
    arr[j - 1] = now
    i--
  }
  console.timeEnd('insertionSort(基础)')
  console.log('count(基础)', count)
  return arr
}

// 选择排序，双向
// @TODO
function insertionSort2 (_arr) {
  console.time('insertionSort2(双向)')
  const arr = [..._arr]
  const len = arr.length
  let i = len - 1
  let count = 0
  // while (i >= len / 2) {
  //   let maxIndex = len - 1 - i
  //   let minIndex = len - 1 - i
  //   for (let j = len - i; j <= i; j++) {
  //     count++
  //     if (arr[j] > arr[maxIndex]) {
  //       maxIndex = j
  //     }
  //   }
  //   swap(arr, maxIndex, i)
  //   for (let j = len - i; j <= i - 1; j++) {
  //     count++
  //     if (arr[j] < arr[minIndex]) {
  //       minIndex = j
  //     }
  //   }
  //   swap(arr, minIndex, len - 1 - i)
  //   i--
  // }
  console.timeEnd('insertionSort2(双向)')
  console.log('count(双向)', count)
  return arr
}

module.exports = {
  insertionSort,
  insertionSort2
}
