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

let copies = new Array(data.length).fill(1)

data.forEach(card => {
  let wins = 0
  console.log('\n-------------- CARD ---------------')
  console.log(card)
  for(number of card.numbers) {
    for(winner of card.winners) {
      if(number == winner) {
        wins++
        console.log(`WINNER card ${card.index}:${number}`)
      }
    }
  } 

  console.log(`Wins for card number ${card.index+1}: ${wins}`)
  let currentIndex = card.index + 1
  for(let i = 0; i + currentIndex < currentIndex + wins; i++) {
    process.stdout.write(`${i+currentIndex}, `)
    copies[i+currentIndex]+= copies[card.index]
  }
  console.log('\n-------------- COPIES ---------------') 
  console.log(copies.reduce((acc, e)=>acc+e)) 
})
