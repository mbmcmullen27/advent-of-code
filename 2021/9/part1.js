const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(rows=>rows.split('').map(x=>parseInt(x)))

let lowpoints = []
data.map((rows,i)=>{
    rows.map((e,j)=>{
       if (check(i,j)) lowpoints.push([i,j]) 
    })
})

function check(i,j) {
    let e = data[i][j]
    if (i > 0 && e >= data[i-1][j]) return false
    if (j > 0 && e >= data[i][j-1]) return false
    if (i < data.length -1 && e >= data[i+1][j]) return false
    if (j < data[i].length -1 && e >= data[i][j+1]) return false
    return true
}

console.log(lowpoints)

console.log(lowpoints.reduce((acc,index)=>data[index[0]][index[1]] +1 +acc,0))