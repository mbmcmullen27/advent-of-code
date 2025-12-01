const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

function part1() {
  let position = 50
  let count = 0

  let turnRight = (delta) => {
    position += delta
    while(position > 99) position -= 100
  }

  let turnLeft = (delta) => {
    position -= delta
    while(position < 0) position += 100
  }


  data.forEach((e, i)=>{
    switch(e[0]) {
      case 'L': turnLeft(parseInt(e.slice(1))); break;
      case 'R': turnRight(parseInt(e.slice(1))); break;
    }

    if(position == 0) {
      count++
    }
  })

  return count
}

function part2() {
  let position = 50
  let count = 0

  let turnRight = (delta)=>{
    while (delta > 0) {
      if(delta > 100 - position) {
        count++
        delta -= (100 - position)
        position = 0
      } else {
        position += delta
        if(position == 100) {
          position = 0
          count++
        }
        return
      }
    }
  }

  let turnLeft = (delta) => {
    while (delta > 0) {
      if(position == 0) position = 100
      if(delta > position) {
        count++

        delta -= position
        position = 100
      } else {
        position -= delta
        if(position == 0) {
          count++

        }
        return
      }
    }
  }

  data.forEach((e)=>{
    let direction = e[0],
        delta = parseInt(e.slice(1))
  
    switch(direction) {
      case 'L': turnLeft(delta); break;
      case 'R': turnRight(delta); break;
    }
  })

  return count
}

console.log(`part 1: ${part1()}`)
console.log(`part 2: ${part2()}`)