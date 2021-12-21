const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n\n/),
    lookup = data[0],
    grid = data[1].split(/\n/).map(x=>Array.from(x).map(c=>c=='#'?1:0))    


    
function enhance(image) {
    let padded = image.map(l=> [0,0,0].concat(l.concat([0,0,0])))
    
    padded.unshift(Array(padded[0].length).fill(0))
    padded.unshift(Array(padded[0].length).fill(0))
    padded.unshift(Array(padded[0].length).fill(0))
    padded.push(Array(padded[0].length).fill(0))
    padded.push(Array(padded[0].length).fill(0))
    padded.push(Array(padded[0].length).fill(0))

    return padded.slice(1,padded.length-1).map((line,i)=>{
        return line.map((_,j)=>{
            return lookup[parseInt(padded[i].slice(j,j+3)
            .concat(padded[i+1].slice(j,j+3))
            .concat(padded[i+2].slice(j,j+3)),2)]
        })
    })
}

let res = enhance(grid).map(x=>x.map(c=>c=='#'?1:0))
// console.log(grid)
console.log(enhance(res).flat().filter(x=>x=='#').length)
// res = res.map(l=>console.log(l.join('')))
// console.log(res)
