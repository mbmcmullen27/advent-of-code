const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>Array.from(line).map(x=>parseInt(x)))

let visible = 0
data.forEach((row,i)=>{
  row.forEach((_,j)=>{
    if(isVisible(i,j)) visible++
  })
})

function isVisible(i,j) {
  if (i===0 || j===0 || i===data.length-1 || j===data[i].length-1) return true

  let directions = [
      data.slice(0,i).map(row=>row[j]),
      data.slice(i+1).map(row=>row[j]),
      data[i].slice(0,j),
      data[i].slice(j+1)
    ] 

  for(dir of directions) {
    if(dir.every(x=>x < data[i][j])) return true
  }
}

console.log(visible)
