const fs = require('fs');
const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/)
  .map(line=>line.split(/\s/).map(e=>parseInt(e)))

console.log(data)
let results = []
data.forEach((list)=>{
  let tree = [list],
  cursor = tree[tree.length-1]
  console.log('-------------------')
  console.log(tree[0])
  while(cursor.filter(x=>x!=0).length > 0) {
    let history = []
    for(let i = 0; i < tree[tree.length - 1].length - 1; i++){
      history[i] = cursor[i+1] - cursor[i]
    }
    console.log(history)
    tree.push(history)
    cursor = tree[tree.length-1]
  }
  
  tree[tree.length-1].push(0)

  do {
    cursor = tree.pop()
    console.log(`value ${cursor[cursor.length - 1]}`)
    let list = tree[tree.length - 1]
    list.push(cursor[cursor.length - 1] + list[list.length - 1])
  } while(tree.length>1)
  console.log(tree[0].slice(-1))
  results.push(...tree[0].slice(-1))
})

console.log(results.reduce((sum, e)=>sum+e))