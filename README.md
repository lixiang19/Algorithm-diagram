# 算法图解笔记——JavaScript

## 前言

《算法图解》笔记，包含JavaScript实现与JavaScript的特性。

## 目录

- 算法简介
- 数据结构
- 递归与迭代
- 算法思路及实现


## 算法简介

简介内容都复制自wiki百科

### 基本要素

算法的核心是创建问题抽象的模型和明确求解目标，之后可以根据具体的问题选择不同的模式和方法完成算法的设计。

### 常用设计模式

- 完全遍历法和不完全遍历法
- 分治法
- 动态规划法
- 贪心算法
- 线性规划法
- 简并法

### 常用实现方法

- 递归与迭代
- 顺序计算、并行计算和分布式计算
- 确定性算法和非确定性算法
- 精确求解和近似求解

### 复杂度

- 时间复杂度：大o
- 空间复杂度

### 大O表示法

大O表示法指出算法的速度有多快。速度指的不是时间而是操作数的增速。

- O(logn)：对数时间，比如二分查找
- O(n)：线性时间，比如简单查找
- O(n*logn)：比如快速排序
- O(n^2) ：比如选择排序
- O(n!)：比如旅行商解决方案

![kE8kIH.png](https://s2.ax1x.com/2019/01/23/kE8kIH.png)

## 数据结构

### 数组

> 是由相同类型的元素（element）的集合所组成的数据结构，分配一块连续的内存来存储。利用元素的索引（index）可以计算出该元素对应的存储地址。

在JavaScript中数组为array，虽然在语言层面上，js中的数组不是真正的数组，而是有length属性，key为数字的对象，也就是时限为哈希映射或字典而不是连续内存块分配但是在v8引擎中，对其进行了优化。

来源：

[Diving deep into JavaScript array – evolution & performance](http://voidcanvas.com/javascript-array-evolution-performance/)

[*Elements kinds* in V8](https://v8.dev/blog/elements-kinds)

所以，在当你写array时，数组元素同类型且无洞，则默认js中的数组与其他语言中的数组并无不同。

### 链表

> 是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)。

### 对比
![kE8kIH.png](https://s2.ax1x.com/2019/01/23/kE8kIH.png)


- 数组的读取熟读很快
- 链表的插入和删除熟读很快

## 散列表

> 散列表（Hash table，也叫哈希表），是根据键（Key）而直接访问在内存存储位置的数据结构。也就是说，它通过计算一个关于键值的函数，将所需查询的数据映射到表中一个位置来访问记录，这加快了查找速度。这个映射函数称做散列函数，存放记录的数组称做散列表。

js中的对象与之类似，map结构更加符合定义。书里介绍的散列函数、冲突和填装因子等实现于v8引擎底层，也就是说自己拿对象来用就行。

## 队列与栈

- 队列：先进先出

- 栈：后进后出

  在js中通过数组来实现

  

## 图与树

图由节点和边组成。一个节点可能与众多节点直接相连，这些节点被称为邻居。

js中通过对象实现。

![kZdi8O.png](https://s2.ax1x.com/2019/01/24/kZdi8O.png)

# 递归与迭代

## 递归

递归在编程中可以简单的理解为在函数定义中调用函数自身

> 
> 我们已经完成了吗？如果完成了，返回结果。如果没有这样的**终止条件**，递归将会永远地继续下去。
>
> 如果没有，则简化问题，解决较容易的问题，并将结果组装成原始问题的解决办法。然后返回该解决办法。

递归有两个条件

- 基线条件

  *基线条件只到达什么条件时函数不再调用自己*

- 递归条件

### 递归调用栈与尾递归

计算机内部在调用函数时使用调用栈，即先进后出，在递归调用时每次调用函数都会压入栈新的信息直至满足基线条件而从顶部开始弹出。在这个过程中因为要储存所有调用帧，非常耗费内存。如果递归编写错误就会发送栈溢出错误。

书上说有两种选择：一是使用循环，二是使用尾递归。

#### 尾调用

> 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。



当函数的内层函数用不到外层函数的内部变量时，这时就可以使用尾调用即返回调用另一个函数

```js
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();
```

#### 尾递归

```js
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
```

可以看出递归函数尾递归优化就是把所有用到的内部变量改写成函数的参数

## 迭代

总结一下js中的循环与迭代方法

- for  of
- for in
- Object.keys()
- map、filter、reduce
- for
- while

# 算法思路及实现

## 查找

### 二分查找

#### 原理

> 搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。
>
> O(logn)

#### 实现
```js
无
```



## 排序

### 选择排序

#### 原理

> 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

#### 算法可视化

[选择排序](https://algorithm-visualizer.org/brute-force/selection-sort)

#### 简单实现

```js
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
```



### 快速排序

#### 原理

> 快速排序使用分治法（Divide and conquer）策略来把一个序列（list）分为两个子序列（sub-lists）。
>
> 步骤为：
>
> 从数列中挑出一个元素，称为“基准”（pivot），
> 重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到任何一边）。在这个分割结束之后，该基准就处于数列的中间位置。这个称为分割（partition）操作。
> 递归地（recursively）把小于基准值元素的子数列和大于基准值元素的子数列排序。
> 递归到最底部时，数列的大小是零或一，也就是已经排序好了。这个算法一定会结束，因为在每次的迭代（iteration）中，它至少会把一个元素摆到它最后的位置去

#### 算法可视化

[快速排序](https://algorithm-visualizer.org/divide-and-conquer/quicksort)

#### 简单实现

```js
const arr1 = [7,5,6,4,8,9,0,55,22,152,263]
function quickSort(arr) {
  if (arr.length>1) {
    let standard = arr.shift()
    let beforeArr = []
    let afterArr = []
    for (const element of arr) {
      if (element>standard) {
        afterArr.push(element)
      } else {
        beforeArr.push(element)
      }
    }
    return [...quickSort(beforeArr), standard, ...quickSort(afterArr)]
  } else {
    return arr
  }
}
console.log('结果是',quickSort(arr1))
```



## 图

### 广度优先搜索

#### 原理

> 简单的说，BFS是从根节点开始，沿着树的宽度遍历树的节点。如果所有节点均被访问，则算法中止。
>
> 1. 首先将根节点放入队列中。
> 2. 从队列中取出第一个节点，并检验它是否为目标。
>    - 如果找到目标，则结束搜索并回传结果。
>    - 否则将它所有尚未检验过的直接子节点加入队列中。
> 3. 若队列为空，表示整张图都检查过了——亦即图中没有欲搜索的目标。结束搜索并回传“找不到目标”。
> 4. 重复步骤2。

#### 算法可视化

[广度优先搜索](https://algorithm-visualizer.org/brute-force/breadth-first-search)

#### 简单实现

```js
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
```

### Dijkstra's 算法

#### 原理

> 这个算法是通过为每个顶点 *v* 保留当前为止所找到的从s到v的最短路径来工作的。初始时，原点 s 的路径权重被赋为 0 （*d[s]* = 0）。若对于顶点 m 存在能直接到达的边（s,m），则把d[m]设为w（s, m）,同时把所有其他（s不能直接到达的）顶点的路径长度设为无穷大，即表示我们不知道任何通向这些顶点的路径（对于所有顶点的集合 *V* 中的任意顶点 *v*， 若 *v* 不为 *s* 和上述 *m* 之一， *d[v]* = ∞）。当算法结束时，*d[v]* 中存储的便是从 *s* 到 *v*的最短路径，或者如果路径不存在的话是无穷大。

#### 算法可视化

[Dijkstra's 算法](https://algorithm-visualizer.org/greedy/dijkstras-shortest-path)

#### 简单实现

```js
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

```



## 贪婪算法

#### 原理

> 是一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果是最好或最优的算法
>
> 贪心算法在有最优子结构的问题中尤为有效。最优子结构的意思是局部最优解能决定全局最优解。简单地说，问题能够分解成子问题来解决，子问题的最优解能递推到最终问题的最优解。
>
> 贪心算法与动态规划的不同在于它对每个子问题的解决方案都做出选择，不能回退。动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。

#### 算法可视化

无

#### 简单实现

```js
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
console.log("final_stations", final_stations)
```





## 动态规划

#### 原理

> 动态规划常常适用于有重叠子问题[1]和最优子结构性质的问题，动态规划方法所耗时间往往远少于朴素解法。
>
> 动态规划背后的基本思想非常简单。大致上，若要解一个给定问题，我们需要解其不同部分（即子问题），再根据子问题的解以得出原问题的解。
>
> 通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用。

# 后记

简单的归纳了一下，下面看算法第四版，配合视频[coursera](https://www.coursera.org/learn/algorithms-part1/home/welcome)




