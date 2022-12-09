const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>line.split(/\s/))

let x = cycle = 1,
    pixelIndex = 0,
    signalReadings = [] 

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
  drawPixel(cycle)
  if(cycle === 20 || (cycle-20) % 40 === 0) signalReadings.push([cycle,x*cycle])
}

function drawPixel(cycle) {
  let sprite = '.'
  if (pixelIndex == 40) pixelIndex = 0, console.log()
  if (pixelIndex <= x+1 && pixelIndex >= x-1) sprite = '#' 
  process.stdout.write(sprite)
  pixelIndex++
}
