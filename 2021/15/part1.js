const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)

let graph = data.map((line, i)=>line.split('').map((e,j)=>{
        let adjacent = [[-1,0],[0,1],[1,0],[0,-1]]
            .map(([x,y])=>[x+i,y+j])
            .filter(([x,y])=> {
                return (x>=0 && y>=0 && x<data.length && y<line.length)
            })
        return {
            weight: parseInt(e),
            adj: adjacent,
            pos: [i,j]
        }
    })),
    length = graph.length,
    width = graph[length-1].length

function search(){
    let queue = [graph[0][0]] 

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

// console.log(graph)
console.log(search())