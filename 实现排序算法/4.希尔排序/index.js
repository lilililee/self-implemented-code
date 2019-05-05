// 链接： https://www.cnblogs.com/chengxiao/p/6104371.html

function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 希尔排序，基础
function shellSort (_arr) {
  console.time('shellSort(基础)')
  const arr = [..._arr]
  if (arr.length <= 1) return arr
  const len = arr.length
  let temp
  let gap = 1
  while (gap < len / 5) {
    // 动态定义间隔序列
    gap = gap * 5 + 1
  }
  for (; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  console.timeEnd('shellSort(基础)')
  return arr
}

module.exports = {
  shellSort
}
