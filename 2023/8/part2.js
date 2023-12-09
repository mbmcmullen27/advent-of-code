const fs = require('fs');
const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/),
  instructions = data[0].split(''),
  table = {}
let nodes = data.slice(2).map(node=>{
    console.log(node)
    let value = node.match(/^[0-9A-Z]*/)[0]
    table[value] = {
      value: value,
      L: node.match(/\(([^,]*)/)[1],
      R: node.match(/([0-9A-Z]*)\)/)[1]
    }
    return table[value]
  }).filter(node=>node.value.match(/[0-9A-Z]{2}A/))
  
let cursor, steps = iIndex = 0, next

// console.log(instructions)
// console.log(table)
console.log(nodes)


// let first = nodes.shift()
// // console.log(`${nodes.shift()}`);
// // console.log('step') 
// // console.log(step(first,0))

// while(nodes.length > 0) {
let endings = 0
while(endings != nodes.length) {
// for(let x = 0; x < 6; x++) {
  let nextNodes = []
  if(iIndex == instructions.length) iIndex = 0
  let instruction = instructions[iIndex]
  console.log(`\n-------------------`)
  console.log(`instruction: ${instruction}`)
  console.log(nodes)
  endings = 0;
  for(let i = 0; i<nodes.length; i++) {
    cursor = nodes[i]
    if(cursor.value[2] == 'Z') endings++
    next = table[cursor[instruction]]
    console.log(`\ncursor: ${cursor.value} L: ${cursor.L} R: ${cursor.R}`)
    console.log(`next: ${next.value} L: ${next.L} R: ${next.R}`)
    nextNodes.push(next)
  }
  console.log(`endings ${endings}`)
  nodes = nextNodes
  
  steps++
  iIndex++
}

console.log(`steps: ${steps}`)



console.log(steps)

// 10298 low