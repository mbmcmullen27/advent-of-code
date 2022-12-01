var fs = require('fs'),
    flashes = 0

function read() {
    return fs.readFileSync('input','utf8')
    .split(/\n/)
    .map(lines=>lines.split('').map(x=>parseInt(x)))
}

function chain(data,i,j){
    if (i < 0 || j < 0 || i > data.length - 1 || j > data[i].length - 1) return
    if(data[i][j] < 11) data[i][j]++
    if (data[i][j]> 9 && data[i][j] < 11) {
        flashes++;

        [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]
        .map(pos=>chain(data, pos[0]+i, pos[1]+j))
    }
}

function partOne(data) {
    [...Array(100)].map(_=>{
        data.map((line,i)=>line.map((_,j)=>chain(data,i,j)))
        data = data.map((line)=>line.map((e)=> e>9?0:e))
    })

    return flashes
}

function partTwo(data) {
    for (let k = 0; ;k++) {
        let zeros = 0
        data.map((line,i)=>line.map((_,j)=>chain(data,i,j)))
        data.map((line,i)=>line.map((_,j)=>{
            if (data[i][j] > 9){
                data[i][j] = 0
                zeros++
            }
        }))
        if(zeros == 100) return k+1;
    }
}

console.log(partOne(read()))
console.log(partTwo(read()))