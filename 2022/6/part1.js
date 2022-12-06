const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')

function scan(arr) {
  let ret = true;
  for(let i = 0; i < data.length - 4; i++){
    let current = Array.from(arr.slice(i,i+4))
    ret = current
    current.forEach(char=>{
      if (current.filter((x) => x=== char).length !== 1) ret = false
    })
    if (ret) return i 
  }
  
}

console.log(scan(data+4))