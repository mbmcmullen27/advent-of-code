const fs = require('fs')
const data = fs.readFileSync('input', 'utf-8')
  .split('\n')
  .map(line=>line.split(' ').filter(token=>token!=''))
  .map(line=>line.map(n=>parseInt(n)))

let triangles = []
for(let i = 0; i < data.length - 2; i++) {
  triangles.push([data[i][0], data[i+1][0], data[i+2][0]])
  triangles.push([data[i][1], data[i+1][1], data[i+2][1]])
  triangles.push([data[i][2], data[i+1][2], data[i+2][2]])
}
let possible = triangles.filter(line=>line[0] + line[1] > line[2]).length
console.log(possible)

console.log(undefinedVar)

var undefinedVar = 25