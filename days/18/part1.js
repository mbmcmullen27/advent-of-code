const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(x=>JSON.parse(x)),
    add = (a,b)=>[a].concat([b])

function reduce(tree) {
    arr = toArray(tree)
    explode(tree)
    if (JSON.stringify(arr) ==  JSON.stringify(toArray(tree))){
        split(tree)
        if (JSON.stringify(arr) ==  JSON.stringify(toArray(tree)))
            return
    }

    reduce(tree)
}

function enqueue(tree, depth) {
    if (tree === undefined) return
    if (typeof(tree) === 'number') {
        return { value: tree,
                depth: depth}
    } else {
        return {left:enqueue(tree[0], depth+1),
                right: enqueue(tree[1], depth+1),
                depth: depth}
    }
}

function link(tree) {
    let list = Array(0)
    function linkList(tree){
        if(tree === undefined)return
    
        if(tree.value !== undefined) {
            list.push(tree)
        } else if (tree !== undefined){
            linkList(tree.left)
            linkList(tree.right)
        }
    }
    linkList(tree)
    return list
}

function split(tree) {
    let list = link(tree,0)
    
    while(list.length>0){
        let e = list.shift()
        if (e.value>=10) {
            e.left = {value: Math.floor(e.value/2.0), depth: e.depth+1},
            e.right =  {value: Math.ceil(e.value/2.0), depth: e.depth+1},
            delete e.value
            break;
        }
    }
}

function explode(tree) {
    let list = link(tree,0)
    let right = list, left = Array(0)
    
    while(list.length>0){
        let e = list.shift()
        if (e.depth>4) {
            let r = list.shift()
            addleft(e, left)
            addRight(r, right)
            e.value = 'x'
            r.value = 'x'
            break;
        } else {
            left.push(e)
        }
    }
    remove(tree)
}

function remove(tree){
    if(tree.value !== undefined) return
    if(tree.left.value == 'x'){
        tree.value = 0
        delete tree.left
        delete tree.right
    } else {
        if(tree.left !== undefined) remove(tree.left)
        if(tree.right !== undefined) remove(tree.right)
    } 
}

function addleft(v,left){
    if(left.length>0){
        let last = left.pop()
        last.value += v.value
        left.push(last)
    }
}

function addRight(v, right){
    if(right.length>0){
        let last = right.shift()
        last.value += v.value
        right.unshift(last)
    }
}

function toArray(tree) {
    if(tree === undefined) return
    if(tree.value !== undefined) return tree.value
    return [toArray(tree.left),toArray(tree.right)]
}

function sum(tree) {
    if(typeof(tree) === 'number') return tree
    return sum(tree[0]) + sum(tree[1])
}

tree=enqueue(add([[[[4,3],4],4],[7,[[8,4],9]]],[1,1]),0)
// console.log([[[[4,3],4],4],[7,[[8,4],9]]].concat([1,1]))

// console.log(JSON.stringify(data[0]))
// console.log(JSON.stringify(data[1]))
// console.log(JSON.stringify(toArray(tree)))
// explode(tree)
// console.log(JSON.stringify(toArray(tree)))
// explode(tree)
// console.log(JSON.stringify(toArray(tree)))
// explode(tree)
// console.log(JSON.stringify(toArray(tree)))
// split(tree)
// console.log(JSON.stringify(toArray(tree)))
// split(tree)
// console.log(JSON.stringify(toArray(tree)))
// split(tree)
// console.log(JSON.stringify(toArray(tree)))
// explode(tree)
// console.log(JSON.stringify(toArray(tree)))
// explode(tree)
// console.log(JSON.stringify(toArray(tree)))

console.log(JSON.stringify(toArray(tree)))
reduce(tree)
console.log(JSON.stringify(toArray(tree)))

let x = data.reduce((a,b)=>{
    console.log(JSON.stringify(a))
    let e = enqueue(add(a,b),0)
    reduce(e)
    return toArray(e)
}) 

console.log(JSON.stringify(x))
console.log(sum(x))
