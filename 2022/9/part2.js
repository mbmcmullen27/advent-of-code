const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/\s/))
    .map(line=> [line[0], parseInt(line[1])])

console.log(data)

let rope = Array(10).fill().map(()=>[0,0]),
    head = rope[0],
    tail = rope[9],
    tailPositions = []

data.forEach((ins, j) => {
  for(let i = 0; i < ins[1]; i++){
    moveHead(ins[0])
    rope.slice(1).forEach((knot,k)=>{
      moveKnot(rope[k], knot) 
    })
    tailPositions.push(`${tail[0]},${tail[1]}`)
  }
})

console.log([...new Set(tailPositions)].length)

function moveHead(dir) {
  switch (dir) {
    case 'R': head[0]++; break;
    case 'L': head[0]--; break;
    case 'U': head[1]++; break;
    case 'D': head[1]--; break;
  }
}

function moveKnot(head, tail) {
  if (distance(head,tail) < 2) return
  if (head[0] == tail[0] || head[1] == tail[1]){
    if(head[0]-tail[0] == 2) tail[0]++
    else if(head[0]-tail[0] == -2) tail[0]--
    else if(head[1]-tail[1] == 2) tail[1]++
    else if(head[1]-tail[1] == -2) tail[1]--
  } else {
    let dx = head[0] - tail[0],
        dy = head[1] - tail[1]
    if (dx > 0) tail[0]++
    else if (dx < 0) tail[0]--
    if  (dy > 0) tail[1]++
    else if (dy < 0) tail[1]--
  }
}

function distance(p1, p2) {
  let [x1, y1] = p1, [x2, y2] = p2
  return  Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}
