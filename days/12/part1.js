const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(s=>s.split('-'))

function isLower(s){return s == s.toLowerCase()}

var graph = {}

function add(node,edge){
    if(graph[node] === undefined) graph[node] = [] 
    graph[node].push(edge)
}

function search(graph){
    let queue = [{value:'start',visits:[]}]

    let total = 0

    while(queue.length!=0) {
        let {value,visits} = queue.shift()
        if(value == 'end'){
            total++
        } else {
            if(isLower(value)) visits[value] = true
            
            graph[value].forEach(node => {
                if(!visits[node]) {
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

function partOne(){
    data.map(e=>{
        add(e[0],e[1])
        add(e[1],e[0])
    })

    return search(graph)
}   

console.log(partOne())

