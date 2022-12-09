const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/\s/))

let x = cycle = 1, signalReadings = [] 

data.forEach(ins=> {
  switch(ins[0]) {
    case 'noop':
      checkSignal(cycle++)
      break
    case 'addx':
      checkSignal(cycle++)
      checkSignal(cycle++)
      x += parseInt(ins[1])
      break
  }
})

function checkSignal(cycle) {
  if(cycle === 20 || (cycle-20) % 40 === 0) signalReadings.push(x*cycle)
}

console.log(signalReadings.reduce((acc,e)=>e+acc,0))