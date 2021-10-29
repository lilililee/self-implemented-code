function swap (arr, index1, index2) {
  const temp = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = temp
}

// 计数排序，基础
function countSort (_arr) {
  console.time('countSort(基础)')
  if (_arr.length <= 1) return _arr
  const len = _arr.length
  const arr = []
  const obj = {}
  const result = []
  let count, i
  for (i = 0; i < len; i++) {
    count = obj[_arr[i]]
    obj[_arr[i]] = count ? count + 1 : 1
  }
  Object.keys(obj).forEach(key => {
    for (i = 0; i < obj[key]; i++) {
      arr.push(+key)
    }
  })
  console.timeEnd('countSort(基础)')
  return arr
}

// 桶排序  https://blog.csdn.net/developer1024/article/details/79770240

// 基数排序  https://baike.baidu.com/item/%E5%9F%BA%E6%95%B0%E6%8E%92%E5%BA%8F/7875498?fr=aladdin

module.exports = {
  countSort
}
