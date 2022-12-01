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

function convert(graph){
    let keys = Object.keys(graph)
    let newGraph = []
    newGraph = keys.map(key=>graph[key].map(e=>keys.indexOf(e)))
    return {graph: newGraph, keys: keys}
}

function search(input){
    let init = [] 
    let {graph, keys} = convert(input)
    keys.forEach((x,i)=>{
        if(x=='start') init[i]=2
        else if(x=='end') init[i]=1
        else init[i]=0
    })
    let queue = [{value:keys.indexOf('start'),visits:[...init]}]
    // console.log(queue[0].visits)
    let total = 0

    while(queue.length!=0) {
        let {value,visits} = queue.pop()
        if(keys[value] == 'end'){
            total++
            // visits = [...init]
        } else {
            // console.log(visits)
            if(isLower(keys[value])) visits[value]++
            
            graph[value].forEach(node => {
                if(visits[node]<2) {
                    queue.push({value:node, visits: [...visits]})
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

// console.log(graph)

console.log(search(graph))
// convert(graph)