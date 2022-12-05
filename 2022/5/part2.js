const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)

let startingStacks = data[0].split(/\n/)
let stacks = Array.from(Array(9), () =>[])
let instructions = data[1].split(/\n/)
console.log(startingStacks)

for(let i = 0; i< startingStacks.length-1;i++){
  let line = Array.from(startingStacks[i])
  let n = 0;
  while(line.length){
    let crate = String(line.splice(0,4).join('').match(/(?<=\[)./))
    if (crate !== 'null') stacks[n].push(crate)
    n++
  }
}

// console.log(stacks)

instructions.forEach(instruction => {
  let n = parseInt(instruction.match(/(?<=move )\d*/))
  let from = parseInt(instruction.match(/(?<=from )\d* /)) - 1
  let to = parseInt(instruction.match(/(?<=to )\d*/)) - 1
  move(n, from, to)
})

function move(n, from, to) {
  stacks[to] = stacks[from].splice(0,n).concat(stacks[to])
}

stacks.forEach(s => process.stdout.write(s[0]))
console.log()