const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(x=>JSON.parse(x)),
    add = (a,b)=>[a].concat([b])

function reduce(tree) {
    let equals = (a,b) => JSON.stringify(a) == JSON.stringify(toArray(b)), 
        arr = toArray(tree)

    explode(tree)
    if (equals(arr, tree)){
        split(tree)
        if (equals(arr, tree))
            return
    }

    reduce(tree)
}

function build(tree, depth) {
    if (typeof(tree) === 'number') {
        return { value: tree,
                depth: depth}
    } else {
        return {left:build(tree[0], depth+1),
                right: build(tree[1], depth+1),
                depth: depth}
    }
}

function stack(tree) {
    let stack = Array(0)
    function fillStack(tree){
        if(tree.value !== undefined) {
            stack.push(tree)
        } else if (tree !== undefined){
            fillStack(tree.left)
            fillStack(tree.right)
        }
    }
    fillStack(tree)
    return stack
}

function split(tree) {
    let list = stack(tree,0),
        splitValue = (x,f) => {
            return {
                value: f(x.value/2.0),
                depth: x.depth+1
            }
        }
    
    while(list.length>0){
        let e = list.shift()
        if (e.value>=10) {
            e.left = splitValue(e, Math.floor)
            e.right = splitValue(e, Math.ceil) 
            delete e.value
            break;
        }
    }
}

function explode(tree) {
    let right = stack(tree,0), left = Array(0)
    
    while(right.length>0){
        let e = right.shift()
        if (e.depth>4) {
            let r = right.shift()
            addleft(e, left)
            addright(r, right)
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

function addright(v, right){
    if(right.length>0){
        let last = right.shift()
        last.value += v.value
        right.unshift(last)
    }
}

function toArray(tree) {
    if(tree.value !== undefined) return tree.value
    return [toArray(tree.left),toArray(tree.right)]
}

function sum(tree) {
    if(typeof(tree) === 'number') return tree
    return (3*sum(tree[0])) + (2*sum(tree[1]))
}

function partOne(){
    let x = data.reduce((a,b)=>{
        let e = build(add(a,b),0)
        reduce(e)
        return toArray(e)
    }) 
    
    return sum(x)
}

function partTwo(){
    return Math.max(...data.map((n,i)=>{
        return data.reduce((a,b,j)=>{
            if(i==j) return a
            let tree = build(add(n,b),0)
            reduce(tree)
            let magnitude = sum(toArray(tree))
            return magnitude > a ? magnitude : a
        },0)
    }))
}

console.log(partOne())
console.log(partTwo())