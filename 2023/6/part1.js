const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

const time = data[0].split(/:?\s+/).slice(1).map(n=>parseInt(n))
const distance = data[1].split(/:?\s+/).slice(1).map(n=>parseInt(n))

console.log(time)
console.log(distance)

let possible = time.map((ms, i) => {
  let result = []
  for(let j = 1; j < ms; j++) {
    result.push((ms-j)*j)
  }
  return result.filter(x=>x>distance[i])
})

console.log(possible.reduce((acc,e)=>e.length*acc,1))