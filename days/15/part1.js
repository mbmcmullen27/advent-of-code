const { listeners } = require('process')

const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)

console.log(data)

let graph = data.map((line, i)=>line.split('').map((e,j)=>{
    let adjacent = [[-1,0],[0,1],[1,0],[0,-1]].filter(adj=> {
        let x = adj[0]+i, y = adj[1]+j
        return x>=0 && y>=0 && x<data.length && y<line.length
    })
    return {
        weight: e,
        adj: adjacent
    }
}))

console.log(graph)
