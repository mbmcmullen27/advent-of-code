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

const folds = data[1].split(/\n/).map(line=>line.match(/.=\d*/)[0])

console.log(folds)

function verticalFold(fold){
    grid.slice(fold).map((e,i)=>{
        grid[fold-i] = e.map((f,j)=> f | grid[fold-i][j])
    })
    grid = grid.slice(0,fold)
}

function horizontalFold(fold){
    grid.map((e,i)=>e.slice(fold).map((f,j)=>{
        grid[i][fold-j] = f | grid[i][fold-j]
    }))
    grid = grid.map((e)=>e.slice(0,fold))
}

let fold = parseInt(folds[0].match(/(?<==)\d*/)[0])
// verticalFold(fold)
// let res = grid.slice(0,fold).flat().filter(p=>p==1)
folds.map(fold=> {
    let dir = fold.match(/.(?==)/)[0],
        pos = fold.match(/(?<==)\d*/)[0]

    if (dir == 'x') verticalFold(pos)
    else if (dir == 'y') horizontalFold(pos)
})
console.log(grid.map(x=>x.map(y=>y==1? '#': ' ').join('')))