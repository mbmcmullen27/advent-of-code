const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(' ').map(e=>parseInt(e)))

let res = data.map(report => {
  return report.reduce((acc, e, i) => {
    if (i==report.length-1) return acc
    else return acc.concat(e - report[i+1])
  }, [])
}).filter(deltas=>{ 
  return deltas.reduce((acc, e) => {

  })
})

console.log(res)

