const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var polymer = data[0], rules = [],
    insert = (polymer) => insertion(polymer).concat(polymer.split('')[polymer.length-1])

data[1].split(/\n/).map(a=>{
    let tokens = a.split(/\s->\s/)
    rules[tokens[0]] = tokens[0][0].concat(tokens[1])
})

function insertion([fst, snd, ...tail]) {
    if (tail.length == 0) return rules[fst+snd]
    return rules[fst+snd]+insertion([snd].concat(tail))
}

function common(list, func) {
    let count = []
    Array.from(list).map(c=>count[c] = (count[c]??0) + 1)
    return func(...Object.values(count))
}

console.log(rules)
console.log(insert(insert(insert(Object.keys(rules)[0]))))

console.log(insert(insert('KF')))
let res = polymer;
console.log(polymer);
[...Array(4)].map(_=>{
    // console.log(res)
    res=insert(res)
})

console.log(common(res,Math.max) - common(res, Math.min))