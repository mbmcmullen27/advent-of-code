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

  step() {
    if ((cavern[this.x]?.[this.y+1]??'.') === '.') {
      console.log("free below")
      this.y++
    } 
    else if ((cavern[this.x-1]?.[this.y+1]??'.') === '.') {
      console.log("free left")
      this.x--, this.y++
    } 
    else if ((cavern[this.x+1]?.[this.y+1]??'.') === '.') {
      console.log("free right")
      this.x++, this.y++
    } 
    else {
      console.log("at rest") 
      this.atRest = true, cavern[this.x][this.y] = 'o'
    } 
  }
}

function dropSand() {
  let unit, total = 0, freeFall = false

  console.log(`height: ${height}`)
  
  // while(total < 30){
  while(!freeFall){
    console.log("new sand")
    total++ 
    unit = new Sand()
    while(!unit.atRest) {
      console.log(`current pos: ${unit.x},${unit.y}`)
      unit.step()
      if (unit.y > height) {freeFall = true; break} 
      if (unit.x > width) {freeFall = true; break}
      if (unit.x < 0) {freeFall = true; break}
    }
  }

  return total
}

var width = height = 0,
    minx = miny = Infinity

data.forEach(l=>l.forEach(pos=>{
  if (pos[0]>width) width = pos[0] + 1
  if (pos[0]<minx) minx = pos[0]
  if (pos[1]>height) height = pos[1]+1
  if (pos[1]<miny) miny = pos[1]
}))

var cavern = Array.from(Array(width+1), ()=>Array(height+1).fill('.'))

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

console.log(`${minx},${miny} - ${width},${height}`)

let res = dropSand()
cavern[500][0] = '+'
print()
console.log(res-1)
// console.log(cavern.slice(minx).map(line=>line.slice(miny).join('')).join('\n'))



function print () {
  console.log(`minx: ${minx}, miny:${miny}`)
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