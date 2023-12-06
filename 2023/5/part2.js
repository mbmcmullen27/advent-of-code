const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split(/\n\n/)

const seedRanges = [...data[0].matchAll(/\d+ \d+/g)].map(range => 
  range[0].split(/\s/).map(n=>parseInt(n))
)

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

function seedRange(source, i=0, k=0) {
  let nextMap = (a) => seedRange(a, i+1, 0),
      nextRange= (a) => seedRange(a, i, k+1)
  
  if( i == maps.length) {
    console.log(`\nend of maps returning [${source[0]}]`)
    return [source[0]]
  }
  if( k == maps[i].ranges.length){
    console.log(`end range, call next map with ${source}`)
    return nextMap(source)
  }
  
  let [start, width] = source,
    range = maps[i].ranges[k],
    delta = (range.destination - range.source),
    newStart = start + delta,
    end = start + width,
    rangeEnd = range.source + range.length

  console.log(`\nindex: ${i},${k} maps.length: ${maps.length}`)
  console.log(`source: ${source} -> ${start}-${end}`)
  console.log(`range: ${[range.source, range.length]} -> ${[range.source,range.source+range.length]}`)
  console.log(`destination: ${[range.destination, range.length]} -> ${[range.destination,range.destination+range.length]}`)
  console.log(`delta: ${delta}`)

  // source range contains input range
  if (start >= range.source && end <= rangeEnd) {
    let newMap = [newStart, width]
    console.log('range contains source...')
    console.log(`next map: ${newMap}`)

    return nextMap(newMap)
  }

  // input range is entirely outside the source range
  if (( start < range.source && end < range.source ) || 
    ( start > rangeEnd )) { 
    console.log('source outside range...')
    console.log(`next range: ${source}`)
    return nextRange(source)
  }

  // input range contains source range
  if (( start <= range.source && end >= rangeEnd )) {
    let newMap = [range.destination, range.length]
    let range1 = [start, range.source - start]
    let range2 = [rangeEnd+1, end - rangeEnd]

    console.log('source contains range...')
    console.log(`next range: ${range1}`)
    console.log(`next map: ${newMap}`)
    console.log(`next range: ${range2}`)

    return nextRange(range1)
      .concat(nextRange(range2))
      .concat(nextMap(newMap))
  }

  // ranges overlap
  if(start < range.source && end >= range.source) {
    console.log('source overlaps on the high end...')
    let newMap = [range.destination, end - range.source]
    let newRange = [start, range.source-start]

    console.log(`next map: ${newMap}`)
    console.log(`next range: ${newRange}`)

    return nextRange(newRange)
      .concat(nextMap(newMap))
  } 

  if(start >= range.source && end > rangeEnd) {
    console.log('source overlaps on the low end...')
    let newMap = [newStart, rangeEnd - start]
    let newRange = [rangeEnd+1,end-rangeEnd]

    console.log(`next map: ${newMap}`)
    console.log(`next range: ${newRange}`)

    return nextRange(newRange).concat(nextMap(newMap))
  }
}

let results = seedRanges
  .map(range=>seedRange(range))
  .reduce((acc,array)=> acc.concat(array),[])

console.log(seedRanges)
console.log(results)
console.log(Math.min(...results))
console.log(Number.MAX_SAFE_INTEGER)

// 189294669 too high
// 264289191
// 121301852 too high
// 189294669
// 59370573 too high
// 178996923
// 59370573
// 59370573