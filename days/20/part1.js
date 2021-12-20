const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n\n/),
    lookup = data[0],
    grid = data[1].split(/\n/).map(x=>Array.from(x).map(c=>c=='#'?1:0))    


let padded = grid.map(l=> [0].concat(l.concat(0)))
console.log(padded.map(x=>"("+x[0]+", "+x[x.length-1]+")"))

// padded = Array(padded[0].length).fill(0).concat(padded)
console.log(padded.length)

padded.unshift(Array(padded[0].length).fill(0))
padded.push(Array(padded[0].length).fill(0))

console.log(padded.length)

