const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(x=>JSON.parse(x)),
    add = (a,b)=>a.concat(b)

console.log(data.map(x=>x.length))

function reduce(tree) {
    explode(tree)
    split(tree)
    reduce(tree)
    return(tree)
}

function explode(pair,tree) {
    
}

function split(pair) {
    let splitVal = (v) => [Math.floor(v/2.0), Math.ceil(v/2.0)],
        left = pair[0],
        right = pair[1]
    
    left = split(left) 
    if (typeof(left) == 'number' && left >= 10) 
        return [splitVal(left), right]
    if (typeof(right) == 'number' && right >= 10) 
        return [left,splitVal(right)]
    right = split(right) 
    
    return [left,right]
}

// data.reduce((a,b)=>add(reduce(a),reduce(b)))

console.log(split([[13,9],8,6]))