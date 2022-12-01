const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)
    .map((e) => e.split(/\n/))
    .map((e)=>e.map(x=>parseInt(x)))

let sums = data.map(elf=>elf.reduce((x,y)=>x+y),0)
let top = sums.sort((x,y)=>y-x);

console.log(`most: ${top[0]}`)
console.log(`top 3 sum: ${top[0] + top[1] + top[2]}`)