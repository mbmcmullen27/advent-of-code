const fs = require('fs');
const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/)
  .map(line=>line.split(/\s/).map(e=>parseInt(e)))

function processList(list) {
  let tree = [list],
  cursor = tree[tree.length-1]
  while(cursor.filter(x=>x!=0).length > 0) {
    let history = []
    for(let i = 0; i < tree[tree.length - 1].length - 1; i++){
      history[i] = cursor[i+1] - cursor[i]
    }
    tree.push(history)
    cursor = tree[tree.length-1]
  }
  return tree
}

function part1() {
  let results = []
  data.forEach((list)=>{
    let tree = processList(list)
    
    tree[tree.length-1].push(0)

    do {
      cursor = tree.pop()
      let list = tree[tree.length - 1]
      list.push(cursor[cursor.length - 1] + list[list.length - 1])
    } while(tree.length>1)
    results.push(...tree[0].slice(-1))
  })

  return results.reduce((sum, e)=>sum+e)
}

function part2(){
  let results = []
  data.forEach((list)=>{
    let tree = processList(list)
  
    do {
      cursor = tree.pop()
      let list = tree[tree.length - 1]
      list.unshift(list[0] - cursor[0])
    } while(tree.length>1)

    results.push(tree[0][0])
  })
  
  return results.reduce((sum, e)=>sum+e)
}

console.log(`part1: ${part1()}`)
console.log(`part2: ${part2()}`)