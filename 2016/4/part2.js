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
      name: line.match(/([a-z\-]*)-/)[1],
      sectorId: parseInt(line.match(/-([0-9]+)/)[1]),
      checksum: line.match(/\[([a-z]{5})\]/)[1],
    }
    
    ret.frequency = ret.name.split('-').join('').split('').frequency().sort((a,b)=>{
      if(a.amt > b.amt) return -1
      else if(a.amt==b.amt && a.value < b.value) return -1
      else  return 1

    })
    return ret
  })

let real = data.filter(
  e => e.frequency.slice(0,5).map(x=>x.value).join("") == e.checksum
)

real.forEach(e=> {
  e.decryptedName = e.name.split('').map(c=> {
    let char = c, code;
    switch(char) {
      case '-':
        return ' ';
      default:
        code = char.charCodeAt(0)+(e.sectorId%26)
        if(code > 'z'.charCodeAt(0)) code -= 26
        return String.fromCharCode(code)
    }
  }).join('')
})


real.forEach(e=>{
  if(e.decryptedName.includes('north')) {
    console.log('----------------')
    console.log(`sectorId:   ${e.sectorId}`)
    console.log(`name:       ${e.name}`)
    console.log(`decrypted:  ${e.decryptedName}\n`)
  }
})

