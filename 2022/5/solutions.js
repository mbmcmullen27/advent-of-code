const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)

let startingStacks = data[0].split(/\n/)
let instructions = data[1].split(/\n/)
let p1stacks = Array.from(Array(9), () =>[])
let p2stacks = Array.from(Array(9), () =>[])

function setup(stacks){
  for(let i = 0; i< startingStacks.length-1;i++){
    let line = Array.from(startingStacks[i])
    let n = 0;

    while(line.length){
      let crate = String(line.splice(0,4).join('').match(/(?<=\[)./))
      if (crate !== 'null') stacks[n].push(crate)
      n++
    }
  }
}

function rearrange(){
  instructions.forEach(instruction => {
    let n = parseInt(instruction.match(/(?<=move )\d*/))
    let from = parseInt(instruction.match(/(?<=from )\d* /)) - 1
    let to = parseInt(instruction.match(/(?<=to )\d*/)) - 1
    mover9000(n, from, to)
    mover9001(n, from, to)
  })
}

function mover9000(n, from, to) {
  [...Array(n)].map( _ =>{
    p1stacks[to].unshift(p1stacks[from].shift())
  });
}

function mover9001(n, from, to) {
  p2stacks[to] = p2stacks[from].splice(0,n).concat(p2stacks[to])
}

setup(p1stacks)
setup(p2stacks)
rearrange()

p1stacks.forEach(s => process.stdout.write(s[0]))
console.log()
p2stacks.forEach(s => process.stdout.write(s[0]))
console.log()