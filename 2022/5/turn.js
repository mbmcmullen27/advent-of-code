const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)

console.log(data[0])
let lines = data[0].split(/\n/)
lines = lines.splice(0,lines.length-1)

let stacks = Array.from(Array(8), () =>[])
lines.forEach((line,i)=> {
  line.match(/...\s?/g).forEach((e)=>{
    stacks[lines.length-1-i].push(e)
  })
})

let newStacks = Array.from(Array(lines.length), () => [])

for(let i = 0; i < lines.length; i++) {
  stacks.forEach(e=>{
    let x = e[i].match(/(?<=\[)./g)
    if(x !== null) newStacks[i].push(x[0])
  })
}

console.log(newStacks)