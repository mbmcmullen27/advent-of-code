const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)

let graph = data.map((line, i)=>line.split('').map((e,j)=>parseInt(e))),
    length = graph.length,
    width = graph[length-1].length

let lgraph = Array.from(Array(length*5),()=>Array(width*5))

graph.map((row,i)=>{
    row.map((e,j)=>{
        scale(i, j, e)
    })
})

lgraph = lgraph.map((line, i)=>line.map((e,j)=>{
        let adjacent = [[-1,0],[0,1],[1,0],[0,-1]]
            .map(([x,y])=>[x+i,y+j])
            .filter(([x,y])=> {
                return (x>=0 && y>=0 && x<lgraph.length && y<line.length)
            })
        return {
            weight: parseInt(e),
            adj: adjacent,
            pos: [i,j]
        }
    }))

function scale(x, y, n){
    let val = n <= 9 ? n : n-9
    lgraph[x][y] = val
    if (x+length < length*5) scale(x+length, y, n+1)
    if (y+width < width*5) scale(x, y+length, n+1)
}

function search(graph){
    let queue = [graph[0][0]],
        length = graph.length,
        width = graph[0].length

    let dist = Array.from(Array(length),()=>Array(width).fill(Number.MAX_SAFE_INTEGER))
    dist[0][0]=0
    while(queue.length!=0) {
        let {adj,pos} = queue.shift()
            
        adj.forEach(([x,y]) => {
            let vertex = graph[x][y],
                distance = dist[pos[0]][pos[1]] + vertex.weight
            if(distance < dist[x][y]) {
                dist[x][y] = distance 
                queue.push(vertex)
            }
        })
    }
    return dist[length-1][width-1]
}

// console.log(lgraph)
console.log(lgraph[0][0])
console.log(lgraph[100][0])
console.log(lgraph[200][0])
console.log(lgraph[2].slice(100,101))
console.log(lgraph[2].slice(200,201))
console.log(lgraph[2].slice(300,301))

console.log(search(lgraph))