const fs = require('fs')
const data = fs.readFileSync('input', 'utf-8')
  .split('\n')
  .map(line=>line.split(' ').filter(token=>token!=''))
  .map(line=>line.map(n=>parseInt(n)))
  .map(line=>line.sort((a,b)=>a-b))

let possible = data.filter(line=>line[0] + line[1] > line[2]).length
console.log(possible)