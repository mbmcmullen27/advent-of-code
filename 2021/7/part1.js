const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(',')

console.log(data)

res = data.map((_, i) => data.reduce((acc, e) => Math.abs(e-i) + acc, 0))

console.log(Math.min(...res))