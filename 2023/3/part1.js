const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split(/\n/)
    .map(line=>line)

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

data.forEach((line,i) => {
  console.log(line.split(/[^0-9]/).filter(n=>n!=''))
  line.split().forEach((char, j) => {
    directions.forEach(dir => {
      let {x,y} = dir 
      console.log(`x: ${x+i}, y: ${y+j}`)
    })

  })
})