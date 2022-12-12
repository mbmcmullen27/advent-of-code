const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split('')
                   .map(n=>{return {dist:Infinity,val:n}})
    )

function scan(val) {
  for(let i = 0; i< data.length; i++){
    for(let j = 0; j<data[i].length;j++){
      if(data[i][j].val === val) return {x:i,y:j}
    }
  }
}

function findAll(val) {
  let ret = []
  for(let i = 0; i< data.length; i++){
    for(let j = 0; j<data[i].length;j++){
      if(data[i][j].val === val) ret.push({x:i,y:j})
    }
  }

  return ret
}

function canStep(pos, dir) {
  let curr = data[pos.x][pos.y].val,
      next = data[dir.x]?.[dir.y]?.val

  if(next === undefined) return false

  if (curr === 'S') curr = 'a'
  if (next == 'E') next = 'z' 
  
  if (next.charCodeAt(0) <= curr.charCodeAt(0) + 1)
    return true
  else 
    return false
}

const directions = [ [0,-1], [0,1], [-1,0], [1,0] ]

function bfs(start, dest) {
  let queue = [], current
  queue.push(start) 
  data[start.x][start.y].dist = 0
  
  while(queue.length != 0) {
    current = queue.shift()

    if (current.x === dest.x && current.y === dest.y) 
      return data[current.x][current.y].dist

    for (dir of directions) {
      let next = { 
          x:current.x+dir[0], 
          y:current.y+dir[1]
        }

      if (canStep(current,next)) {
        let dist = data[next.x][next.y].dist,
            calculated = data[current.x][current.y].dist+1
        if (dist > calculated){
          data[next.x][next.y].dist = calculated
          queue.push(next)
        } 
      } 
    }
  }
}

let start = scan('S')
let end = scan('E')
let lowest = findAll('a')
lowest.push(start)
let result = bfs(start, end, 0)
let list = lowest.map(a=>bfs(a,end)).sort((a,b)=>a-b)

console.log(`part1 ${result}`)
console.log(`part2 ${list[0]}`)