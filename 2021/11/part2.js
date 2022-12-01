var data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(lines=>lines.split('').map(x=>parseInt(x)))

var flashes = 0;
[...Array(500)].map((_,k)=>{
    let zeros = 0
    data.map((line,i)=>line.map((_,j)=>chain(i,j)))
    data.map((line,i)=>line.map((_,j)=>{
        if (data[i][j] > 9){
            data[i][j] = 0
            zeros++
        }
        if(zeros == 100) console.log(`synchronized at ${k}`)
    }))
})

// console.log(flashes)

function chain(i,j){
    if (i < 0 || j < 0 || i > data.length - 1 || j > data[i].length - 1) return
    // console.log(`data[${i}][${j}] : ${data[i][j]}`)
    if(data[i][j] < 11) data[i][j]++
    if (data[i][j]> 9 && data[i][j] < 11) {
        flashes++;
        [[-1,0],[-1,1],[0,1],[1,1],
        [1,0],[1,-1],[0,-1],[-1,-1]]
            .map(pos=>chain(pos[0]+i,pos[1]+j))
    }
}