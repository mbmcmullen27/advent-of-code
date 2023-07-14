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
  // .slice(0,10)

console.log(data)
data.forEach(e => {
  console.log('------------------------------------')
  console.log(`   location: ${location}`)
  console.log(`   NEXT MOVE ${e}`)
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
  console.log(`   heading index ${heading}`)
  console.log(`   heading ${dir[heading]}`)

  let delta = parseInt(e.match(/[0-9]+/)[0])
  console.log(`   delta ${delta}`)
  let deltac = dir[heading].map(e=>e*delta)
  console.log(`   deltac ${deltac}\n`)
  location[0] += deltac[0]
  location[1] += deltac[1]
})

console.log(location)