const fs = require('fs');
const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/),
  instructions = data[0].split(''),
  table = {},
  nodes = data.slice(2).map(node=>{
    let value = node.match(/^[A-Z]*/)[0]
    table[value] = {
      value: value,
      L: node.match(/\(([^,]*)/)[1],
      R: node.match(/([A-Z]*)\)/)[1]
    }
    return table[value]
  })
  
let cursor = table['AAA'],
  steps = i = 0

console.log(instructions)
console.log(table)
console.log(cursor)


while(cursor.value !== 'ZZZ') {
  // console.log(`cursor: ${cursor.value} L: ${cursor.L} R: ${cursor.R}`)
  if(i===instructions.length) i = 0
  cursor = table[cursor[instructions[i]]]
  steps++, i++
}

console.log(steps)

