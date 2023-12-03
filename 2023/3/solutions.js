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

function part1() {
  let total = 0
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data.length; j++) {
      directions.forEach(dir => {
        let x = dir.x + i,
        y = dir.y + j
        if(x>=0 && x<data.length && y>=0 && y<data[x].length) {
          if (data[x][y].match(/[^\.0-9]/) && data[i][j].match(/[0-9]/)) {
            let candidate = collect(i,j)
            j = candidate.tail
            total += candidate.value
          }
        }
      })
    }
  }
  return total;
}

function part2() {
  let total = 0
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < data.length; j++) {
      if (data[i][j] === '*') {
        let factors = [] 
        directions.forEach(dir => {
          let x = dir.x + i,
          y = dir.y + j
          if(x>=0 && x<data.length && y>=0 && y<data[x].length) {
            if(data[x][y].match(/[0-9]/)) {
              let candidate = collect(x,y)
              if (factors.filter(e=>e.head == candidate.head && e.value == candidate.value).length == 0) {
                factors.push(candidate)
              }
            }
          } 
        })
  
        if(Array.from(factors).length == 2) {
          let product = Array.from(factors).reduce((acc,e)=>e.value*acc,1)
          total+=product
        }
      }
    }
  }

  return total
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)

//89471771
//556367