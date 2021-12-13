const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

let width=0, height=0
const points = data[0].split(/\n/).map(line=>{
    let x = parseInt(line.split(/,/)[0])
    let y = parseInt(line.split(/,/)[1])
    if (y>height) height = y
    if (x>width) width = x
    return [x,y]
})

var grid = Array.from(Array(width+1),()=>Array(height+1).fill(0))

points.map(p=>grid[p[0]][p[1]]=1)

// console.log(points)
// console.log(grid)

const first = data[1].split(/\n/)[0].match(/.=\d*/)[0]

console.log(first)
let fold = parseInt(first.match(/(?<==)\d*/))
grid.slice(fold).map((e,i)=>{
    grid[fold-i] = e.map((f,j)=> f | grid[fold-i][j])
})

let res = grid.slice(0,fold).flat().filter(p=>p==1)

console.log(res.length)