const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>Array.from(line).map(x=>parseInt(x)))

let score = visible = 0
data.forEach((row,i)=>{
  row.forEach((_,j)=>{
    let current = calculateScore(i,j)
    if(current > score) score = current
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

  return false
}

function calculateScore(i,j) {
  let curr = data[i][j],
      directions = [
        data.slice(0,i).map(row=>row[j]).reverse(),
        data.slice(i+1).map(row=>row[j]),
        data[i].slice(0,j).reverse(),
        data[i].slice(j+1)
      ]
  
  let reduceFunc = (acc, e, i, arr) => {
    if (e >= curr) arr.splice(i)
    return ++acc
  }

  return directions.reduce((acc, e) => e.reduce(reduceFunc,0) * acc, 1)
}

console.log(`part 1: ${visible}`)
console.log(`part 2: ${score}`)