const fs = require('fs')
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line => line.split(/\s/))

let call = ['A', 'B', 'C']

let total = data.reduce((score, round)=>{
  let opp = call.indexOf(round[0])
  let res;
  switch (round[1]) {
    case 'Z': // win 
      if(opp == 2) res = 0
      else res = opp + 1
      return score + res + 1 + 6
    case 'Y': // draw 
      res = opp
      return score + res + 1 + 3
    case 'X': // lose 
      if(opp == 0) res = 2
      else res = opp - 1
      return score + res + 1
  }
}, 0)

console.log(`total: ${total}`)
