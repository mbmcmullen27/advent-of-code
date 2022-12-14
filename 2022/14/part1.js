const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/\s->\s/)
                   .map(pos=>pos.split(/,/)
                                .map(e=>parseInt(e))))

console.log(data)

class Sand {
  constructor() {
    this.x = 500
    this.y = 0
  }

  step() {

  }
}

function dropSand() {
  let grain = new Sand()
}

let width = height = 0,
    minx = miny = Infinity
data.forEach(l=>l.forEach(pos=>{
  if (pos[0]>width) width = pos[0]
  if (pos[0]<minx) minx = pos[0]
  if (pos[1]>height) height = pos[1]
  if (pos[1]<miny) miny = pos[1]
}))

var cavern = Array.from(Array(width), ()=>Array(height).fill('.'))

data.forEach(line=>{
  for (let i = 0; i < line.length-1; i++) {
    console.log(`${line[i]}->${line[i+1]}`)
    let [x1, y1, x2, y2] = [line[i][0], line[i][1], line[i+1][0], line[i+1][1]]
        x = Math.min(x1, x2),
        y = Math.min(y1, y2),
        dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1)
        
    if (x1 == x2)
      cavern[x].splice(y, dy, ...Array(dy+1).fill('#')) 

    if (y1 == y2)
      for (let i = x; i < x+dx; i++) cavern[i][y] = '#'
  }
})

console.log(`${minx},${miny} - ${width},${height}`)
console.log(cavern.slice(minx).map(line=>line.slice(miny).join('')).join('\n'))
console.log(cavern.slice(minx).map(line=>line.slice(miny)))