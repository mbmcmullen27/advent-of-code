const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)

const seeds = data[0].split(/:?\s/).slice(1).map(n=>parseInt(n))
const maps = data.slice(1).map(map => {
  return {
    type: map.match(/^[^\s]*/)[0],
    ranges: map.split(/\n/).slice(1).map(range=>{
      return {
        destination: parseInt(range.split(/\s/)[0]),
        source: parseInt(range.split(/\s/)[1]),
        length: parseInt(range.split(/\s/)[2])
      }
    })
  }
})

console.log(seeds)
console.log(maps[0])

let locations = seeds.map(seed => {
  console.log(`\nProcessing seed: ${seed}`)
  let location = maps.reduce((value, map) => {
    let ret = value
    console.log(`  Converting ${map.type}\n    value:${value}`)
    for(range of map.ranges) {
      if(value >= range.source && value <= range.source + range.length) {
        ret = (value - range.source) + range.destination
        break
      }
    }
    console.log(`    result: ${ret}`)
    return ret
  }, seed)
  return location
})

console.log(Math.min(...locations))