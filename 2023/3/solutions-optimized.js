const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(''))

let directions = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x:-1, y: 1 },
      { x:-1, y: 0 },
      { x:-1, y:-1 },
      { x: 0, y:-1 },
      { x: 1, y:-1 }
    ]

function inBounds(x,y) { return x>=0 && x<data.length && y>=0 && y<data[x].length }

function collect(x,y) {
  let head = y, tail = y
  while(data[x][head] && data[x][head].match(/[0-9]/)) head--
  while(data[x][tail] && data[x][tail].match(/[0-9]/)) tail++

  return {
    value: parseInt(data[x].slice(head+1,tail).join('')),
    head: head,
    tail: tail
  }
}

function solve() {
  let part1_total = 0, part2_total = 0, cursor = -1
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data[i].length; j++) {
      let factors = [], char = data[i][j]
      if (char === '*' || char.match(/[0-9]/)) {
        directions.forEach(dir => {
          let x = dir.x + i,
              y = dir.y + j
          if(inBounds(x,y)) {
            if(char === '*' && data[x][y].match(/[0-9]/)) {
              let candidate = collect(x,y)
              if (factors.filter(e=>e.head == candidate.head && e.value == candidate.value).length == 0) {
                factors.push(candidate)
              }
            } else if (j >= cursor && char.match(/[0-9]/) && data[x][y].match(/[^\.0-9]/)) {
              let candidate = collect(i,j)
              cursor = candidate.tail
              part1_total += candidate.value
            }
          } 
        })
  
        if(Array.from(factors).length == 2) {
          let ratio = Array.from(factors).reduce((acc,e)=>e.value*acc,1)
          part2_total+=ratio
        }
      }
    }
    cursor = -1
  }

  return [part1_total, part2_total]
}

let result = solve()
console.log(`part1: ${result[0]}`)
console.log(`part2: ${result[1]}`)

//556367
//89471771