const fs = require('fs')

Array.prototype.frequency = function() {
  let res = []
  this.forEach(L=>{
    let entry = res.find(e=>e.value===L)
    entry !== undefined ? entry.amt++ : res.push({value:L,amt:1})
  })
  return res
}

const data = fs.readFileSync('input', 'utf-8')
  .split('\n')
  .map(line=>{
    let ret = {
      input: line,
      name: line.match(/([a-z\-]*)-/)[1].split('-').join(''),
      sectorId: parseInt(line.match(/-([0-9]+)/)[1]),
      checksum: line.match(/\[([a-z]{5})\]/)[1],
    }
    ret.frequency = ret.name.split('').frequency().sort((a,b)=>{
      if(a.amt > b.amt) return -1
      else if(a.amt==b.amt && a.value < b.value) return -1
      else  return 1

    })
    return ret
  })

// data.forEach(e=>{
//   console.log(`----------${e.name}-----------`)
//   console.log(`name:  ${e.input}`)
//   console.log(`secId: ${e.sectorId}`)
//   console.log("frequency: ")
//   e.frequency.forEach(e=>console.log(e))
// })

let real = data.filter(
  e => e.frequency.slice(0,5).map(x=>x.value).join("") == e.checksum
)

console.log(real.reduce((acc, e)=>e.sectorId+acc, 0))
