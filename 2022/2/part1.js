const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line => line.split(/\s/))

let call = ['A', 'B', 'C']
let response = ['X', 'Y', 'Z']

let total = data.reduce((score, round)=>{
  let opp = call.indexOf(round[0])
  let res = response.indexOf(round[1])
  if((res == 0 && opp == 2) || opp == res - 1) // win
    return score + res + 1 + 6
  else if (res == opp) // draw
    return score + res + 1 + 3
  else // lose
    return score + res + 1
}, 0)

console.log(`total: ${total}`)