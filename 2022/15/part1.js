const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.match(/^.*x=(-?\d+), y=(-?\d+).*x=(-?\d+), y=(-?\d+)/)
                   .slice(1,5)
                   .map(x=>parseInt(x)))

console.log(data)

let cavern = []