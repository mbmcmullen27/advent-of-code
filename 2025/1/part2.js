const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

let position = 50
let count = 0

function turnRight(delta) {
  console.log(`turn right ${delta}`)
  while (delta > 0) {
    if(delta > 100 - position) {
      count++
      console.log("hit")
      delta -= (100 - position)
      position = 0
    } else {
      position += delta
      if(position == 100) {
        position = 0
        count++
        console.log("hit")
      }
      return
    }
  }
}

function turnLeft(delta) {
  console.log(`turn left ${delta}`)
  while (delta > 0) {
    if(position == 0) position = 100
    if(delta > position) {
      count++
      console.log("hit")
      delta -= position
      position = 100
    } else {
      position -= delta
      if(position == 0) {
        count++
        console.log("hit")
      }
      return
    }
  }
}


data.forEach((e)=>{
  let direction = e[0],
      delta = parseInt(e.slice(1))

  console.log(`--> position: ${position}`)
  switch(direction) {
    case 'L': turnLeft(delta); break;
    case 'R': turnRight(delta); break;
  }
})

console.log(count)