exports.bubbleSort = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

exports.selectSort = arr => {
  for (let i = arr.length - 1; i >= 0; i--) {
    let maxIndex = 0
    for (let j = 1; j <= i; j++) {
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j
      }
    }
    [arr[j], arr[maxIndex]] = [arr[maxIndex], arr[j]]
  }
  return arr
}
