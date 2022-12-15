const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.match(/^.*x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/)
                   .slice(1,5)
                   .map(x=>parseInt(x)))
    .map(line=>[[line[0],line[1]], [line[2], line[3]]])

console.log(data)

let emptyCoords = []
let checkLine = 10
data.forEach(([s,b])=>{
  let distance = Math.abs(s[0]-b[0]) + Math.abs(s[1]-b[1])
  for(let i = -(distance); i <= distance; i++) {
    if (checkLine <= s[1] + distance && checkLine >= s[1] - distance) {
      let dx = i <= 0 ? distance + i : distance - i
      let y = s[1] + i
      let x1 = s[0] - dx
      let x2 = s[0] + dx
      for(let j = x1; j<=x2; j++){
        if (b[1] == y && b[0] == j ) continue 
        if (y == 10) emptyCoords.push(String([j,y]))
      } 
    }
  }
})

console.log(emptyCoords)
console.log([...new Set(emptyCoords.map(x=>String(x)))].length)