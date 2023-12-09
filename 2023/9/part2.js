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

  do {
    cursor = tree.pop()
    let list = tree[tree.length - 1]
    console.log(`difference: ${cursor[0]} shift: ${list[0]-cursor[0]}`)
    list.unshift(list[0] - cursor[0])
    console.log(list)
  } while(tree.length>1)
  console.log(tree[0][0])
  results.push(tree[0][0])
})

console.log(results.reduce((sum, e)=>sum+e))