// 快速排序
const arr1 = [7,5,6,4,8,9,0,55,22,152,263]

// 通过递归求数组中项的和
function sum(arr) {
  if (arr.length>1) {
    let res  = arr.shift() + sum(arr)
    return res
  } else {
    return arr[0]
  }
}

// 快速排序
function quickSort(arr) {
  if (arr.length>1) {
    let standard = arr.shift()
    let beforeArr = []
    let afterArr = []
    arr.map(element =>{
      if (element>standard) {
        afterArr.push(element)
      } else {
        beforeArr.push(element)
      }
    })
    return [...quickSort(beforeArr), standard, ...quickSort(afterArr)]
  } else {
    return arr
  }
}
console.log(quickSort(arr1))