const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

let position = 50
let count = 0

function turnRight(delta) {
  position += delta
  while(position > 99) position -= 100
  console.log(`turn right ${delta} to ${position}`)
}

function turnLeft(delta) {
  position -= delta
  while(position < 0) position += 100
  console.log(`turn left ${delta} to ${position}`)
}


data.forEach((e, i)=>{
  switch(e[0]) {
    case 'L': turnLeft(parseInt(e.slice(1))); break;
    case 'R': turnRight(parseInt(e.slice(1))); break;
  }

  if(position == 0) {
    count++
    console.log(`--------> position: ${position} after ${i} turns, ${count}`)
  }
})

console.log(count)