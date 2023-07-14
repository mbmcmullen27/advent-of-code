const fs = require('fs');
const data = fs.readFileSync('input', 'utf-8')
  .split('\n')

const keypad = [
  [0x0,0x0,0x1,0x0,0x0],
  [0x0,0x2,0x3,0x4,0x0],
  [0x5,0x6,0x7,0x8,0x9],
  [0x0,0xA,0xB,0xC,0x0],
  [0x0,0x0,0xD,0x0,0x0],
]
// console.log(data)

let prev = [2,0]
let code = data.map(e=>{
  let sequence = e.split('');
  sequence.forEach(move=>{
    console.log(`prev ${prev} : ${keypad[prev[0]][prev[1]]}`)
    console.log(`Move ${move}`)
    switch(move) {
      case 'U':
        if (prev[0] > 0 && keypad[prev[0]-1][prev[1]] != 0x0) prev[0]-- 
        break;
      case 'D':
        if (prev[0] < 4 && keypad[prev[0]+1][prev[1]] != 0x0) prev[0]++  
        break;
      case 'R':
        if (prev[1] < 4 && keypad[prev[0]][prev[1]+1] != 0x0) prev[1]++
        break;
      case 'L':
        if (prev[1] > 0 && keypad[prev[0]][prev[1]-1] != 0x0) prev[1]-- 
        break;
    }
    console.log(`->moves to ${prev} : ${keypad[prev[0]][prev[1]]}\n`)
  })
  console.log(`-----> Next number ${keypad[prev[0]][prev[1]]}`)
  return keypad[prev[0]][prev[1]].toString(16)
})
console.log(code.join(''))