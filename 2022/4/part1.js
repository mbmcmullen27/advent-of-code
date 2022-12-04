const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/[-,]/).map(i=>parseInt(i)))
	    	
let sum = 0
data.forEach(pair=>{
    if (pair[0] >= pair[2] && pair[1] <= pair[3]) sum++
    else if (pair[2] >= pair[0] && pair[3] <= pair[1]) sum++
})

console.log(sum)
