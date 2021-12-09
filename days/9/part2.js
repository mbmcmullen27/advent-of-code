const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(rows=>rows.split('').map(x=>parseInt(x)))

var lowpoints = []
var visited = Array.from(Array(100), ()=>Array(100).fill(false))

data.map((rows,i)=>{
    rows.map((e,j)=>{
       if (checkLow(i,j)) lowpoints.push([i,j]) 
    })
})

function checkLow(i,j) {
    let e = data[i][j]
    if (i > 0 && e >= data[i-1][j]) return false
    if (j > 0 && e >= data[i][j-1]) return false
    if (i < data.length -1 && e >= data[i+1][j]) return false
    if (j < data[i].length -1 && e >= data[i][j+1]) return false
    return true
}

function checkEdge(i, j) {
    if (i < 0 || j < 0 || i >= data.length -1 || j >= data[i].length -1) return false
    
    if (data[i][j]==9){
        return false
    }
    if (visited[i][j]){
        return false
    } 

    return true
}

function search(x, y) {
    let queue = [];
    queue.push([x,y])
    visited[x][y] = true

    let total = 0

    while(queue.length!=0) {
        let e = queue.shift()
        total++
        
        [[-1,0], [0,1], [1,0], [0,-1]].forEach(dir => {
            let next = [e[0]+dir[0], e[1]+dir[1]]
            
            if(checkEdge(next[0], next[1])) {
                queue.push([next[0], next[1]])
                visited[next[0]][next[1]] = true
            }
        })
    }
    return total
}

console.log(lowpoints.map(e=>search(e[0], e[1])).sort((a,b)=>b-a).slice(0,3).reduce((acc,x)=>acc*x))
