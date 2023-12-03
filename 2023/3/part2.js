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
    if (data[i][j] === '*') {
      console.log(`\n${data[i][j]} x: ${i}, y: ${j}`)
      let factors = [] 
      directions.forEach(dir => {
        let x = dir.x + i,
        y = dir.y + j
        if(x>=0 && x<data.length && y>=0 && y<data[x].length) {
          if(data[x][y].match(/[0-9]/)) {
            console.log(`HIT symbol ${data[x][y]} at ${x},${y}`)
            let candidate = collect(x,y)
            console.log(`candidate: ${candidate.value} @ ${candidate.head}`)
            if (factors.filter(e=>e.head == candidate.head && e.value == candidate.value).length == 0) {
              factors.push(candidate)
            }

          }
        } 
      })

      console.log(factors)
      if(Array.from(factors).length == 2) {
        let product = Array.from(factors).reduce((acc,e)=>e.value*acc,1)
        console.log(`product: ${product}`)
        total+=product
      }
    }
  }
}

console.log(total)


function collect(x,y) {
  let head = y, tail = y, num
  while(data[x][head] && data[x][head].match(/[0-9]/)) head--
  while(data[x][tail] && data[x][tail].match(/[0-9]/)) tail++
  num = parseInt(data[x].slice(head+1,tail).join(''))
  console.log(`collecting ${num}`)
  return {
    value: num,
    head: head,
  }
}

// 88373022 low
// 75201781
// 34127935