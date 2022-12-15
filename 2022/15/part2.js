const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.match(/^.*x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/)
                   .slice(1,5)
                   .map(x=>parseInt(x)))
    .map(line=>[[line[0],line[1]], [line[2], line[3]]])

let emptyCoords = []
let max = 4000000 

function lineRange(checkLine) {
  data.forEach(([s,b])=>{
    let distance = Math.abs(s[0]-b[0]) + Math.abs(s[1]-b[1])
    if (checkLine <= s[1] + distance && checkLine >= s[1] - distance) {
      let dy = Math.abs(checkLine - s[1])
      let dx = Math.abs(distance - dy)
      let x1 = s[0] + dx <=max? s[0] + dx: max
      let x2 = s[0] - dx >=0? s[0] - dx: 0
      emptyCoords.push({
        sensor: s,
        beacon: b,
        y:checkLine, 
        range: [x1, x2]})
      }
  })
}
//  [ 8, 0 ], [ 14, 2 ], [ 18, 14 ] ]

function contains(range, other) {
  if (range[0] >= other[0] && range[1] <= other[1]) return true 
}

let moddedCoords =[]
for(let i = 0; i <= max; i++) {
  lineRange(i)
  // console.log(emptyCoords)
  let line = emptyCoords.filter(pos=>pos.y==i)
  // moddedCoords[i] = line.map(x=>{return {y:x.y, range: x.range}})
  moddedCoords[i] = removeOverlaps(line).map(x=>x.range)
}

function removeOverlaps(line) {
  // console.log(line.map(x=>x.range))
  let toDelete = []
  line.forEach((l,i,arr)=>{
    for(let j = 0; j < arr.length -1; j++) {
      let other = arr[j]
      if(i == j || other === undefined) continue
      if(contains(l.range,other.range)) {
        // console.log(`${l.range} contains ${other.range}`)
        toDelete.push(j)
      }
    }
    toDelete.forEach((j)=>delete line[j])
  })
  return line
}

function merge(line,i){
  // console.log("********")
  line.sort((a,b)=> {
    if (a[1] !== b[1]) return a[1] - b[1]
    else return a[0] - b[0]
  })

  let range = [line[0][0], line[0][1]]
  for(let i = 1; i <= line.length; i++){
    let next = line[i]
    let pos = range
    if(next !== undefined && (pos[0]+1 >= next[1])) {
      // console.log("greater")
      if(range[0] < next[0])
        range[0] = next[0]
    } 

      // arr[i].range[0] = next.range[1] - 1
  } 
  if( range[0]!=max) console.log(`[${range[0]+1},${i}]`)
  return range
  // console.log(range)
  // console.log(line)
  // return line.reduce((acc, x)=> {
  //   if (acc[1] >= x[0]) return [acc[0],x[1]]
  // },line[0])

}
// moddedCoords = moddedCoords.map(line=>line.sort((a,b)=>a[1] - b[1]))
moddedCoords = moddedCoords.map((line,i)=>merge(line,i))
// console.log(emptyCoords.sort((a,b)=>a.range[1] - b.range[1]))
// console.log(moddedCoords.filter(x=>x[0]!))


// let diff = emptyCoords.map((range)=>range[0]-range[1]+1)
// let sum = diff.reduce((sum,x)=>x+sum)
// let beacons = [... new Set(data.map(([,beacon])=> String(beacon)))].map(x=>JSON.parse(`[${x}]`))
// beacons = beacons.filter(([,y])=>y==checkLine)
// beacons.forEach(b=>emptyCoords.forEach(([x1,x2])=>{
//   if(b[0] >= x2 && b[0]<= x1) {
//     sum--
//   }
// }))

// console.log(sum)