const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>
      line.split(/[-,]/).map(i=>parseInt(i))
    )
	    	
let sum = 0
data.forEach(pair=>{
  let [left,right] = [ pair.slice(0,2), pair.slice(2) ]
  if (overlapping(left,right) || overlapping(right,left)) sum++
})

function overlapping(left,right){ return between(left[0],right) || between(left[1],right)}
function between(x, pair) { return x >= pair[0] && x <= pair[1] }

console.log(sum)
