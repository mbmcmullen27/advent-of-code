const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

const time = parseInt(data[0].split(/:?\s+/).slice(1).join(''))
const distance = parseInt(data[1].split(/:?\s+/).slice(1).join(''))

console.log(time)
console.log(distance)

let possible = 0

for(let j = 1; j < time; j++) {
  // console.log(`held for ${j} ms\n  time remaining: ${time-j}\n  result: ${(time-j)*j}`)
  if(((time-j) * j) > distance) possible++
}

console.log(possible)

// 71503 low