const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(''))

let total = 0,
    directions = [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x:-1, y: 1 },
      { x:-1, y: 0 },
      { x:-1, y:-1 },
      { x: 0, y:-1 },
      { x: 1, y:-1 }
    ]

for(let i = 0; i < data.length; i++) {
  for(let j = 0; j < data.length; j++) {
    directions.forEach(dir => {
      let x = dir.x + i,
      y = dir.y + j
      if(x>=0 && x<data.length && y>=0 && y<data[x].length) {
        if (data[x][y].match(/[^\.0-9]/) && data[i][j].match(/[0-9]/)) {
          console.log(`\nchar: ${data[i][j]} x: ${x}, y: ${y}`)
          console.log(`HIT symbol ${data[x][y]} at ${x},${y}`)
          j = collect(i,j)
        }
      }
    })
  }
}

console.log(total)


function collect(x,y) {
  let head = y, tail = y, num
  while(data[x][head] && data[x][head].match(/[0-9]/)) head--
  while(data[x][tail] && data[x][tail].match(/[0-9]/)) tail++
  num = parseInt(data[x].slice(head+1,tail).join(''))
  total += num
  console.log(`collecting ${num}`)
  return tail
}