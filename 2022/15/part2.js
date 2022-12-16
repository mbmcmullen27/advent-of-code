const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.match(/^.*x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/)
                   .slice(1,5)
                   .map(x=>parseInt(x)))
    .map(line=>[[line[0],line[1]], [line[2], line[3]]])

let max = 4000000 

for(let y = 0; y <= max; y++) {
  for(let x = 0; x <= max; x++) {
    let index = inRange([x,y])
    if (Number.isInteger(index)) {
      x = jump([x,y], index)
    } else if (index === false) {
      console.log(`pos = ${x},${y} frequency = ${x*4000000 + y}`)

    } 
  }
}

function jump([x1,y], index) {
  let [sensor, beacon] = [data[index][0], data[index][1]],
      distance = Math.abs(sensor[0]-beacon[0]) + Math.abs(sensor[1]-beacon[1]),
      dy = Math.abs( y - sensor[1]),
      dx = Math.abs(distance - dy),
      x = sensor[0] + dx <= max ? sensor[0] + dx : max

  return x
}

function inRange(pos) {
  let ret = false
  data.slice(0).forEach(([s,b], i, arr)=>{
    let distance = Math.abs(s[0]-b[0]) + Math.abs(s[1]-b[1]),
        dy = Math.abs(pos[1] - s[1]),
        dx = Math.abs(pos[0] - s[0])
    if (dx+dy <= distance){
      ret = i 
      arr = arr.slice(0,i)
    } 
  })

  return ret
}
