const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>parseInt(e))

let i = max = sum = 0;
while (i <=  data.length) {
  if(!isNaN(data[i]) || i == data.length){
    sum += data[i]
  } 
  if(sum > max){
    max = sum
  }
  if (isNaN(data[i])) sum = 0 
  i++
}

console.log(max)
// 71023