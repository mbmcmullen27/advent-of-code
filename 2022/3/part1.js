const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0;
jump: for(line of data) {
  let first = line.substring(0,line.length/2)
  let second = line.substring(line.length/2)
  for(achar of first) {
    for(bchar of second) {
      if(achar === bchar) {
        if (achar == achar.toLowerCase()) {
          sum += lower.indexOf(achar) + 1
        } else {
          sum += upper.indexOf(achar) + 27
        }
        continue jump
      }
    }
  }
}

console.log(sum)