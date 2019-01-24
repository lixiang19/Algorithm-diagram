// 贪婪算法
let states_needed = new Set(['mt','wa','or','id','nv','ut'])
const stations = {
  kone: new Set(['id','nv','ut']),
  ktwo: new Set(['wa','id','mt']),
  kthree: new Set(['or','nv','ca']),
  kfour: new Set(['nv','ut']),
  kfive: new Set(['ca','az'])
}
let final_stations = new Set()


const getIntersection = (set1,set2) => new Set([...set1].filter(element => set2.has(element)))
const getDifference = (set1,set2) => new Set([...set1].filter(element => !set2.has(element)))

while (states_needed.size>0) {
  let best_station 
  let states_covered = new Set()
  for (const key in stations) {
    if (stations.hasOwnProperty(key)) {
      const element = stations[key];
      let covered = getIntersection(states_needed,element)
      if (covered.size>states_covered.size) {
        best_station = key
        states_covered = covered
      }
    }
  }
  states_needed = getDifference(states_needed,states_covered)
  final_stations.add(best_station)
}
console.log("​final_stations", final_stations)