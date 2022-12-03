const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
const lower = "abcdefghijklmnopqrstuvwxyz"
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let sum = 0;
jump: for(let i = 0; i<data.length; i+=3) {
  for(achar of data[i]) {
    for(bchar of data[i+1]) {
      if(achar === bchar) {
        for (cchar of data[i+2]){
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