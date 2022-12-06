const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')

function scan(arr, len, start) {
  let ret = true;
  for(let i = start; i < data.length - len; i++){
    let current = Array.from(arr.slice(i,i+len))
    ret = current
    current.forEach(char=>{
      if (current.filter((x) => x=== char).length !== 1) ret = false
    })
    if (ret) {
      console.log(current)
      return i
    } 
  }
}

console.log(scan(data, 4, 0) + 4)
console.log(scan(data, 14, 1987) + 14)
