const fs = require('fs')
const data = fs.readFileSync('input', 'utf-8')
  .split('\n')
  .map(line=>line.split(' ').filter(token=>token!=''))
  .map(line=>line.map(n=>parseInt(n)))

Array.prototype.ezSort=function(){return this.sort((a,b)=>a-b)}

let triangles = []
for(let i = 0; i < data.length - 2; i+=3) {
  triangles.push([data[i][0], data[i+1][0], data[i+2][0]].ezSort())
  triangles.push([data[i][1], data[i+1][1], data[i+2][1]].ezSort())
  triangles.push([data[i][2], data[i+1][2], data[i+2][2]].ezSort())
}

let possibleTriangles = triangles.filter(line=>line[0] + line[1] > line[2])
console.log(possibleTriangles.length)
