const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>Array.from(line).map(x=>parseInt(x)))

let score = 0
data.forEach((row,i)=>{
  row.forEach((_,j)=>{
    let current = calculate(i,j)
    if(current > score) score = current
  })
})

function calculate(i,j) {
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

console.log(score)