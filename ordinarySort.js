// 普通排序从小到大
function findSmallest(arr) {
  let smallest = arr[0]
  let smallestIndex = 0
 for (let i = 1; i < arr.length; i++) {
   const element = arr[i];
   if (element<smallest) {
     smallest = element
     smallestIndex = i
   }
 }
 return smallestIndex
}
function selectionSort(arr) {
  let newArr = []
  let length =arr.length
  for (let i = 0; i < length; i++) {
    smallestIndex = findSmallest(arr)
    newArr.push(arr[smallestIndex])
    arr.splice(smallestIndex,1)
  }
  return newArr
}
const arr1 = [1,5,6,4,8,9]
console.log('结果是',selectionSort(arr1))