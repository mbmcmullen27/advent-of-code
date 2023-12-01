const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(''))

let total = data.map(line=> {
  let first, last
  for(char of line) {
    if (char >=0 && char <= 9) {
      if(first == undefined) first = last = char
      else last = char
    }
  }
  return parseInt(`${first}${last}`)
}).reduce((acc,x)=>x+acc)

console.log(total)
