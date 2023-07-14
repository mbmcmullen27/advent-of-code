const fs = require('fs');
const data = fs.readFileSync('input', 'utf-8')
  .split('\n')

const keypad = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
// console.log(data)

let prev = [1,1]
let code = data.map(e=>{
  let sequence = e.split('');
  sequence.forEach(move=>{
    // console.log(`prev ${prev} : ${keypad[prev[0]][prev[1]]}`)
    // console.log(`Move ${move}`)
    switch(move) {
      case 'U':
        if (prev[0] > 0) prev[0]-- 
        break;
      case 'D':
        if (prev[0] < 2) prev[0]++  
        break;
      case 'R':
        if (prev[1] < 2) prev[1]++
        break;
      case 'L':
        if (prev[1] > 0) prev[1]-- 
        break;
    }
    // console.log(`->moves to ${prev} : ${keypad[prev[0]][prev[1]]}\n`)
  })
  // console.log(`-----> Next number ${keypad[prev[0]][prev[1]]}`)
  return keypad[prev[0]][prev[1]]
})
console.log(code.join(''))