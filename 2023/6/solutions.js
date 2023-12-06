const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

function part1() {
  const time = data[0].split(/:?\s+/).slice(1).map(n=>parseInt(n))
  const distance = data[1].split(/:?\s+/).slice(1).map(n=>parseInt(n))

  let possible = time.map((ms, i) => {
    let result = []
    for(let j = 1; j < ms; j++) {
      result.push((ms-j)*j)
    }
    return result.filter(x=>x>distance[i])
  })

  return possible.reduce((acc,e)=>e.length*acc,1)
}

function part2() {
  const time = parseInt(data[0].split(/:?\s+/).slice(1).join(''))
  const distance = parseInt(data[1].split(/:?\s+/).slice(1).join(''))
  
  let possible = 0
  for(let j = 1; j < time; j++) {
    if(((time-j) * j) > distance) possible++
  }
  
  return possible
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)