const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var polymer = data[0], rules = [],
    insert = (polymer) => insertion(polymer).concat(polymer.split('')[polymer.length-1])

data[1].split(/\n/).map(a=>{
    let tokens = a.split(/\s->\s/)
    rules[tokens[0]] = tokens[0][0].concat(tokens[1])
})

function insertion([head, neck, ...tail]) {
    if (tail.length == 0) return rules[head+neck]
    return rules[head+neck]+insertion([neck].concat(tail))
}

function common(list, func) {
    let count = []
    let chars = Array.from(list)
    chars.map(c=>count[c] = (count[c]??0) + 1)
    let res = Object.keys(count)[(func(...Object.values(count)))]
    console.log(count)
    console.log(count.filter(x=>x==func(...Object.values(count))))
    // console.log(count.findIndex())
    return res
}


console.log(rules)
let res = insert(polymer);
[...Array(2)].map(_=>{
    res=insert(res)
})

console.log(res)
console.log(common(res, Math.max))