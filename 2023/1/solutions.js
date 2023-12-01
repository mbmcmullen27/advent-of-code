const fs = require('fs');
const numbers = [
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
]
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)


function part1() {
  return data.map(line=> {
    let first, last
    for(char of line) {
      if (char >=0 && char <= 9) {
        if(first == undefined) first = last = char
        else last = char
      }
    }
    return parseInt(`${first}${last}`)
  }).reduce((acc,x)=>x+acc)
}

function part2() {
  return data.map(line=> {
    let first, last
    for(i in numbers) {
      line = line.replaceAll(numbers[i], `${numbers[i]}${parseInt(i)+1}${numbers[i]}`)
    }
  
    for(char of line.split('')) {
      if (char >=0 && char <= 9) {
        if(first == undefined) first = last = char
        else last = char
      }
    }
    return parseInt(`${first}${last}`)
  }).reduce((acc,x)=>x+acc)
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)
