const { listeners } = require('process')

const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)

console.log(data)

let graph = data.slice(0,1).map((line, i)=>line.split('').map((e,j)=>{
    let adjacent = [[-1,0],[0,1],[1,0],[0,-1]].map(([x,y])=>[x+i,y+j]).filter(([x,y])=> {
        // console.log(`${i},${j} x:${x} y:${y}`)
        return (x>=0 && y>=0 && x<data.length && y<line.length)
    })
    // console.log(adjacent)
    return {
        weight: e,
        adj: adjacent,
        pos: [i,j]
    }
}))

// graph[0].map((v,i)=>console.log(`(${0},${i})${v.weight} [${v.adj}]`))
graph[0].map((v,i)=>console.log(v.adj))

function search(graph){
    let queue = [graph[0][0]]

    let total = 0

    while(queue.length!=0) {
        let {weight,adjacent,pos} = queue.shift()
        if( pos[0] == graph.length
                && pos[1] == graph[graph.length-1].length-1){
            break;
        } else {
            // if(isLower(value)) visits[value] = true
            
            adjacent.forEach(node => {
                if(weight > 0) {
                    queue.push({value:node, visits: copy(visits)})
                }
            })
        }
    }
    return total
}
