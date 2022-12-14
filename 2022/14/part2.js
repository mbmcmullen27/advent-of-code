const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/\s->\s/)
                   .map(pos=>pos.split(/,/)
                                .map(e=>parseInt(e))))

class Sand {
  constructor() {
    this.x = 500
    this.y = 0
    this.atRest = false
  }

  rest() { this.atRest = true, cavern[this.x][this.y] = 'o' }

  step() {
    if ((cavern[this.x]?.[this.y+1]??'.') === '.') this.y++
    else if ((cavern[this.x-1]?.[this.y+1]??'.') === '.') this.x--, this.y++
    else if ((cavern[this.x+1]?.[this.y+1]??'.') === '.') this.x++, this.y++
    else this.rest()
  }
}

function dropSand() {
  let unit, total = 0, freeFall = false

  while(!freeFall){
    total++ 
    unit = new Sand()
    while(!unit.atRest) {
      unit.step()
      if (unit.y == height) {unit.rest()} 
      if (unit.atRest && unit.x == 500 && unit.y == 0) {
        freeFall = true
        break
      }
    }
  }

  return total
}

function print() {
  let flipped = Array.from(Array(height), () => [])
  
  for(let i = 0; i < height; i++) {
    cavern.forEach(e=>{
      let x = e[i]
      if(x !== null) flipped[i].push(x)
    })
  }
  
  flipped.forEach((line,x) => {
    process.stdout.write("\n")
    line.slice(minx).forEach((unit, y)=>process.stdout.write(unit))
  })
  process.stdout.write("\n")
}

var width = height = 0,
    minx = miny = Infinity

data.forEach(l=>l.forEach(pos=>{
  if (pos[0]>width) width = pos[0] + 1
  if (pos[0]<minx) minx = pos[0]
  if (pos[1]>height) height = pos[1]+1
  if (pos[1]<miny) miny = pos[1]
}))

var cavern = Array.from(Array(1000), ()=>Array(height+1).fill('.'))

data.forEach(line=>{
  for (let i = 0; i < line.length-1; i++) {
    console.log(`${line[i]}->${line[i+1]}`)
    let [x1, y1, x2, y2] = [line[i][0], line[i][1], line[i+1][0], line[i+1][1]]
        x = Math.min(x1, x2),
        y = Math.min(y1, y2),
        dx = Math.abs(x2 - x1),
        dy = Math.abs(y2 - y1)
        
    if (x1 == x2)
      cavern[x].splice(y, dy, ...Array(dy).fill('#')) 

    if (y1 == y2)
      for (let i = x; i <= x+dx; i++) cavern[i][y] = '#'
  }
})

let res = dropSand()
console.log(res)
