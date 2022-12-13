const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')

function compare(leftArr, rightArr) {
  if(Array.isArray(leftArr) && Array.isArray(rightArr)){
    if(leftArr.length == 0 && rightArr.length > 0) 
      return true
    if(rightArr.length == 0 && leftArr.length > 0) 
      return false

    let len = Math.max(leftArr.length,rightArr.length)
    for(let i = 0; i < len; i++) {
      let left = leftArr[i], right = rightArr[i]
      if (left == undefined) return true
      if (right == undefined) return false

      if (Number.isInteger(left) && Number.isInteger(right)) {      
        if (left !== right) return left < right
      } 
      else if (Array.isArray(left) && Number.isInteger(right)){
        rightArr[i] = [right]
        i--
      }
      else if (Number.isInteger(left) && Array.isArray(right)) {
        leftArr[i] = [left]
        i--
      }
      else if(Array.isArray(left) && Array.isArray(right)){ 
        let res = compare(left,right)
        if(res === true || res === false) return res
      }
    }
  }
}

let data1 = data.split(/\n\n/)
                .map(pair=>pair.split(/\n/)
                               .map(arr=>JSON.parse(arr)))
let data2 = data.split(/\n/)
                .filter(line=>line!='')
                .map(packet=>JSON.parse(packet))

let result = data1.map((pair)=> compare(pair[0],pair[1])),
    indicies = [], i = -1, j

while((i = result.indexOf(true,i+1)) != -1) indicies.push(i+1)
console.log(indicies.reduce((sum,x)=>sum+x,0))

data2.push([[2]])
data2.push([[6]])

let sorted = data2.slice().sort((a,b)=>{
  if(compare(a,b)) return -1
  else return 1
}).map(p=>JSON.stringify(p))

i = sorted.indexOf(JSON.stringify(data2[data2.length-1]))
j = sorted.indexOf(JSON.stringify(data2[data2.length-2]))
console.log((i+1)*(j+1))
