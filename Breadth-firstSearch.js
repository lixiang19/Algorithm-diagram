
// 广度优先搜索
let graph = {}
graph.you = ['alice','bob','claire']
graph.bob = ['anuj','peggy']
graph.alice = ['peggy']
graph.claire = ['thom','jonny']
graph.anuj = []
graph.peggy = []
graph.thom = []
graph.jonny = []

function isM(name) {
  return name.endsWith('m')
}

function graphSearch(map) {
  let checkingQueue = []
  let completeQueue = []
  checkingQueue =  checkingQueue.concat(graph.you)
  while (checkingQueue.length > 1) {
   let person = checkingQueue.shift()
   if (!completeQueue.includes(person)) {
    if (isM(person)) {
      console.log('m是',person)
   } else {
     completeQueue.push(person)
     checkingQueue = checkingQueue.concat(graph[person])
   }
   } 
  }
}
graphSearch(graph)