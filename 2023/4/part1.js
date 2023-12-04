const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/[|:]/)
                   .slice(1)
                   .map(set=>set.split(' ')
                                .filter(e=>e!='')
                                .map(n=>parseInt(n))))

console.log(data)
let points = new Array(data.length).fill(0)
data.forEach((card, i) => {
  console.log(card)
  // console.log(card[1])
  NEXT: 
  for(number of card[1]) {
    for(winner of card[0]) {
      if(number == winner) {
        console.log(`WINNER card ${i}:${number}`)
        points[i] = points[i] == 0 ? 1 : points[i] * 2
        continue NEXT
      }
    }
  }
})

points.forEach(card=>console.log(card))
// console.log(points)
console.log(points.reduce((acc,e)=>e+acc))