const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.match(/^.*x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/)
                   .slice(1,5)
                   .map(x=>parseInt(x)))
    .map(line=>[[line[0],line[1]], [line[2], line[3]]])

let emptyCoords = []
let checkLine = 2000000 

data.forEach(([s,b])=>{
  let distance = Math.abs(s[0]-b[0]) + Math.abs(s[1]-b[1])
  if (checkLine <= s[1] + distance && checkLine >= s[1] - distance) {
    let dy = Math.abs(checkLine - s[1])
    let dx = Math.abs(distance - dy)
    emptyCoords.push([s[0]+dx, s[0]-dx])
  }
})

function contains(range, other) {
  if (range[0] <= other[0] && range[1] >= other[1]) return true 
}
emptyCoords.forEach((range,i,arr)=>{
  arr.slice(0,i).forEach(other=> {
    if(contains(range,other)) arr.splice(i,1)
  })
  arr.slice(i+1).forEach(other=> {
    if(contains(range,other)) arr.splice(i,1)
  })
})

emptyCoords.sort((a,b)=>a[2] - b[1])

emptyCoords.forEach((range,i,arr)=>{
  let next = arr[i+1]
  if(next !== undefined && range[0] >= next[1]) arr[i][0] = next[1] - 1
})

let diff = emptyCoords.map((range)=>range[0]-range[1]+1),
    sum = diff.reduce((sum,x)=>x+sum),
    beacons = [... new Set(data.map(([,beacon])=> String(beacon)))]
              .map(x=>JSON.parse(`[${x}]`))

beacons = beacons.filter(([,y])=>y==checkLine)
beacons.forEach(b=>emptyCoords.forEach(([x1,x2])=>{
  if(b[0] >= x2 && b[0]<= x1) {
    sum--
  }
}))

console.log(sum)