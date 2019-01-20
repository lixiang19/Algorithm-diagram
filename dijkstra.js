// 迪克斯特拉算法
const infinity = Number.POSITIVE_INFINITY 

const graph = {
  start: {
    a : 5,
    b: 2
  },
  a: {
    c: 4,
    d: 2
  },
  b: {
    a: 8,
    d: 7
  },
  c: {
    d: 6,
    end: 3
  },
  d: {
    end: 1
  },
  end: {}
}
let costs = {
  a: 5,
  b: 2,
  c: infinity,
  d: infinity,
  end: infinity
}
let parents = {
  a: 'start',
  b: 'start',
  c: '',
  d: '',
  end: ''
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
  return min.key
}
let node = findMinConst(costs)
while (node) {
  let cost = costs[node]
  let neighbors = graph[node]
  for (const key in neighbors) {
    if (neighbors.hasOwnProperty(key)) {
      const element = neighbors[key];
      new_cost = cost + element
      if (new_cost < costs[key]) {
        costs[key] = new_cost
        parents[key] = node
      }
    }
  }
  processed.push(node)
  node = findMinConst(costs)
}
console.log('graph',graph)
console.log('costs',costs)
console.log('parents',parents)
