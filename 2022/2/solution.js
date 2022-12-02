const fs = require('fs')
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line => line.split(/\s/))

let call = ['A', 'B', 'C']
let response = ['X', 'Y', 'Z']

function part1() {
  return data.reduce((score, round)=>{
    let opp = call.indexOf(round[0])
    let res = response.indexOf(round[1])

    if((res == 0 && opp == 2) || opp == res - 1) // win
      return score + res + 1 + 6
    else if (res == opp) // draw
      return score + res + 1 + 3
    else // lose
      return score + res + 1

  }, 0)
}

function part2() {
  return data.reduce((score, round)=>{
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
}

console.log(`part1 total: ${part1()}`)
console.log(`part2 total: ${part2()}`)
