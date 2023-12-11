const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((line,i)=>line.split('').map((node,j)=>{
      return {
        value: node,
        pos:  {y: i, x: j},
        adjacent: {
          right:  { y: i,   x: j+1 },
          left:   { y: i,   x: j-1 },
          up:     { y: i-1, x: j },
          down:   { y: i+1, x: j }
        },
      }
    }))

let start

for(let i=0; i < data.length; i++)
  for(let j=0; j< data[i].length; j++)
    if(data[i][j].value == 'S'){
      start = data[i][j]
      break;
    } 
      

// console.log(data)
console.log(`start: ${Object.values(start.pos)}`)

// console.log(data.slice(start.pos.y-2,start.pos.y+2).map(line=>{
//   return line.slice(start.pos.x-2,start.pos.x+2).map(n=>n.value).join('')
// }).join('\n'))

let path = [],
  cursor = Object.keys(start.adjacent).reduce((acc,e)=> {
    let { y,x } = start.adjacent[e], neighbor = data[y][x]
    switch(e) {
      case('right'):
        if(neighbor.value.match(/[-7J]/)) {
          path[0] = e
          return neighbor
        } else return acc
      case('left'):
        if(neighbor.value.match(/[-FL]/)) {
          path[0] = e
          return neighbor
        } else return acc
      case('up'):
        if(neighbor.value.match(/[|F7]/)) {
          path[0] = e
          return neighbor
        } else return acc
      case('down'):
        if(neighbor.value.match(/[|LJ]/)) {
          path[0] = e
          return neighbor
        } else return acc
      default: return acc
    }
},null)

console.log(start)
console.log(cursor)
console.log(path)

function traverse(cursor, path) {
  console.log(`\ncursor: ${cursor.pos.x} ${cursor.pos.y}`)
  console.log(`path: ${path}`)
  console.log(`${path.length}`)
  switch(path[path.length -1]) {
    case('right'): delete cursor.adjacent.left; break;
    case('left'): delete cursor.adjacent.right; break;
    case('up'): delete cursor.adjacent.down; break;
    case('down'): delete cursor.adjacent.up; break;
  }
  
  for(dir of Object.keys(cursor.adjacent)) {
    let {x,y} = cursor.adjacent[dir],
      neighbor = data[y][x],
      log = ()=> {
        console.log(`direction: ${dir}`) 
        console.log(`location: ${x},${y}`)
        console.log(`value: ${neighbor.value}`)
      }
    if(neighbor){
      if(neighbor.value == 'S') return path.length+1
      switch(dir) {
        case('right'):
          if(neighbor.value.match(/[-7J]/)) {
            log()
            path.push(dir)
            return traverse(neighbor, path)
          }
          break;
        case('left'):
          if(neighbor.value.match(/[-LF]/)) {
            log()
            path.push(dir)
            return traverse(neighbor, path)
          }
          break;
        case('up'):
          if(neighbor.value.match(/[|F7]/)) {
            log()
            path.push(dir)
            return traverse(neighbor, path)
          }
          break;
        case('down'):
          if(neighbor.value.match(/[|LJ]/)){
            log()
            path.push(dir)
            return traverse(neighbor, path)
          }
          break;
      }
    }
  }
}

console.log(traverse(cursor,path))
