const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(',')

console.log(data)

res = data.map((_, i) => data.reduce((acc, e) =>{
    let distance = Math.abs(e-i) 
    return (distance * (distance + 1) / 2)+ acc
}, 0)) 

console.log(Math.min(...res))