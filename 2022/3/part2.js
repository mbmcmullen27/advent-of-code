const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0;
jump: for(let i = 0; i<data.length; i+=3) {
  let first = data[i]
  let second = data[i+1]
  let third = data[i+2]
  for(achar of first) {
    for(bchar of second) {
      if(achar === bchar) {
        for (cchar of third){
          if(achar === cchar){
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
  }
}

console.log(sum)