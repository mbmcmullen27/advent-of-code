const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(s=>s.split('-'))

function isLower(s){return s === s.toLowerCase()}

var graph = {}

function add(node,edge){
    if(graph[node] === undefined) graph[node] = [] 
    graph[node].push(edge)
}

function search(graph){
    let init = [] 
    Object.keys(graph).forEach(x=>{
        if(x=='start') init[x]=2
        else if(x=='end') init[x]=1
        else init[x]=0
    })
    let queue = [{value:'start',visits:init}]
    // console.log(queue[0].visits)
    let total = 0

    while(queue.length!=0) {
        let {value,visits} = queue.shift()
        if(value == 'end'){
            total++
        } else {
            // console.log(visits)
            if(isLower(value)){
                visits[value]++
            }    
            graph[value].forEach(node => {
                if(visits[node]<2) {
                    queue.push({value:node, visits: copy(visits)})
                }
            })
        }
    }
    return total
}

function copy(arr){
    let newArray = []
    Object.keys(arr).forEach(i=>{
        newArray[i] = arr[i]
    })
    return newArray
}

data.map(e=>{
    add(e[0],e[1])
    add(e[1],e[0])
})

console.log(graph)

console.log(search(graph))