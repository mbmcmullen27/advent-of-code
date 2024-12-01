const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split('  ').map(e=>parseInt(e)))

const left = data.map(line=>line[0])
const right = data.map(line=>line[1])

function part1() {
    let leftSorted = left.sort(),
        rightSorted = right.sort()

    return leftSorted.reduce((sum, e, i) => sum + Math.abs(e - rightSorted[i]), 0)
}

function part2() {
    return left.reduce((similarity, e) => {
        return similarity + (e * right.reduce((count, val) => val === e ? count+1 : count, 0))
    }, 0)
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)