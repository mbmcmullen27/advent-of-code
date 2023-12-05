const fs = require('fs');

Array.prototype.parseInts = function() {
  return this.filter(e=>e!='').map(n=>parseInt(n))
}

const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/)
  .map(line=> {
    return {
      index: parseInt(line.match(/Card\s+([0-9]+)/)[1]) - 1,
      winners: line.split(/[:|]/)[1].split(' ').parseInts(),
      numbers: line.split(/[:|]/)[2].split(' ').parseInts()
    }
  })

function part1() {
  let points = new Array(data.length).fill(0)
  data.forEach((card, i) => {
    for(number of card.numbers) {
      for(winner of card.winners) {
        if(number == winner) {
          points[i] = points[i] == 0 ? 1 : points[i] * 2
          break
        }
      }
    }
  })

  return points.reduce((acc,e)=>e+acc)
}

function part2() {
  let copies = new Array(data.length).fill(1)
  data.forEach(card => {
    let wins = 0
    for(number of card.numbers) {
      for(winner of card.winners) {
        if(number == winner) {
          wins++
          break
        }
      }
    } 

    let currentIndex = card.index + 1
    for(let i = 0; i + currentIndex < currentIndex + wins; i++) {
      copies[i+currentIndex]+= copies[card.index]
    }
  })
  
  return copies.reduce((acc, e)=>acc+e)
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)