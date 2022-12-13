const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split(/\n\n/)
    .map(pair=>pair.split(/\n/).map(arr=>JSON.parse(arr)))

console.log(data)

function compare(leftArr, rightArr) {
  console.log(`comparing \n\t${leftArr} to \n\t${rightArr}`)
  if(leftArr === undefined) return true
  if(rightArr === undefined) return false
  let left = leftArr[0], right = rightArr[0]
  if (Number.isInteger(left) && Number.isInteger(right)) {
    
    if (left === right){
      console.log('sliced')
      return compare(leftArr.slice(1), rightArr.slice(1))
    } 
    // console.log(`compare: ${left} vs ${right}`)
    return left < right

  } else if(Array.isArray(left) && Array.isArray(right)) {
    if(left[0] < right[0]) return true

    console.log(`arrays left ${leftArr} and ${rightArr}`)
    for(let i = 0; i < left.length; i++) {
      if(compare(left[i],right[i])) return true
    }
    // if(compare(left[0],right[0])) return true
    return compare(left.slice(1),right.slice(1))
    
  } 
  else if (Array.isArray(left) && Number.isInteger(right)){
    console.log(`mixed types- compare ${left} vs [${right}]`)
    return compare(left, [right])
  }
  else if (Number.isInteger(left) && Array.isArray(right)) {
    console.log(`mixed types- compare [${left}] vs ${right}`)
    return compare([left], right)
  }
}

let result = data.map(pair=>compare(pair[0],pair[1]))
console.log(result)