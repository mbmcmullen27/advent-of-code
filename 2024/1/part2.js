const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split('  ').map(e=>parseInt(e)))

const left = data.map(line=>line[0])
const right = data.map(line=>line[1])

let answer = left.reduce((sum, e, i) => {
    return sum + (e * right.reduce((acc, k) => k==e?acc+1:acc, 0))
}, 0)

console.log(answer)