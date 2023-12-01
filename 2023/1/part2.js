const fs = require('fs');
const numbers = [
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
]
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

let total = data.map(line=> {
  let first, last
  for(i in numbers) {
    console.log(`i:${parseInt(i)+1} value:${numbers[i]}`)
    line = line.replaceAll(numbers[i], `${numbers[i]}${parseInt(i)+1}${numbers[i]}`)
  }

  console.log(line)
  for(char of line.split('')) {
    if (char >=0 && char <= 9) {
      if(first == undefined) first = last = char
      else last = char
    }
  }
  console.log(`calibration ${parseInt(`${first}${last}`)}`)
  return parseInt(`${first}${last}`)
}).reduce((acc,x)=>x+acc)

console.log(total)
