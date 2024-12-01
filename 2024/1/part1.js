const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split('  ').map(e=>parseInt(e)))

const left = data.map(line=>line[0]).sort()
const right = data.map(line=>line[1]).sort()

let answer = left.reduce((sum, e, i) => {
    return sum + Math.abs(e - right[i])
}, 0)

console.log(answer)