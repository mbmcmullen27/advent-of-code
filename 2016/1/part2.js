const fs = require('fs');

let heading = 0
let location = [0,0]
let dir = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
]
let data = fs.readFileSync('./input', 'utf8')
  .split(',')

console.log(data)
let history = []

process:
for(e of data) {
  let turn = e.match(/[RL]/)[0]
  switch(turn) {
    case 'R':
      heading++
      heading = heading < 4 ? heading : 0
      break
    case 'L':
      heading--
      heading = heading >= 0 ? heading : 3
      break
  }

  let delta = parseInt(e.match(/[0-9]+/)[0])
  let deltac = dir[heading].map(e=>e*delta)

  let increment = dir[heading]
  for(let i = 0; i < delta; i++) {
    Math.abs(deltac[0]) > 0 ? location[0]+= increment[0] : location[1] += increment[1]
    let filter = history.filter(e => e[0] == location[0] && e[1] == location[1])
    if(filter.length>0) {
      console.log(`REVISIT ${location}`)
      console.log(Math.abs(filter[0][0]) + Math.abs(filter[0][1]))
      break process
    }
    
    history.push([location[0],location[1]])
  }
}
