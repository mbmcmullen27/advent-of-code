const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var width=0, height=0, grid
const points = data[0].split(/\n/).map(line=>{
    let x = parseInt(line.split(/,/)[0])
    let y = parseInt(line.split(/,/)[1])
    if (y>height) height = y
    if (x>width) width = x
    return [x,y]
}),
folds = data[1].split(/\n/).map(line=>line.match(/.=\d*/)[0])

function read() {
    grid = Array.from(Array(width+1),()=>Array(height+1).fill(0))
    points.map(p=>grid[p[0]][p[1]]=1)
}

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

function partOne(){
    read()
    let fold = parseInt(folds[0].match(/(?<==)\d*/)[0])
    verticalFold(fold)
    return grid.slice(0,fold).flat().filter(p=>p==1).length

}

function partTwo() {
    read()
    folds.map(fold=> {
        let dir = fold.match(/.(?==)/)[0],
            pos = fold.match(/(?<==)\d*/)[0]
    
        if (dir == 'x') verticalFold(pos)
        else if (dir == 'y') horizontalFold(pos)
    })
    return grid.map(x=>x.map(y=>y==1? '#': ' '))
}

console.log(partOne())

let res = partTwo()
for(let i = 0; i <res[0].length; i++){
    let next = []
    for (line in res) {
        next.push(res[line][i])
    }
    console.log(next.join(''))
}