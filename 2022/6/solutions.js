const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')

function scan(len = 4, start = 0, arr = data) {
  let ret = true;
  for(let i = start; i < data.length - len; i++){
    let current = Array.from(arr.slice(i,i+len))
    ret = current
    current.forEach(char=>{
      if (current.filter((x) => x=== char).length !== 1) ret = false
    })
    if (ret) return i + len
  }
}

let packetMarker = scan()
console.log(`packet marker: ${packetMarker}`)
console.log(`message marker: ${scan(14, packetMarker)}`)
