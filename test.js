const infinity = Number.POSITIVE_INFINITY 

let costs = {
  a: 5,
  b: 2,
  c: infinity,
  d: infinity,
  end: infinity
}
let processed = []
function findMinConst(costs) {
  let min = {
    key: '',
    value: infinity
  }
  for (const key in costs) {
    if (costs.hasOwnProperty(key)) {
      const element = costs[key];
     if (element < min.value && !processed.includes(key)) {
      min.key = key
      min.value = element    
     }
    }
  }
  processed.push(min.key)
  console.log(processed)
  return min.key
}
findMinConst(costs)
findMinConst(costs)
findMinConst(costs)