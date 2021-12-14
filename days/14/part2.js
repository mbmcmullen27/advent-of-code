const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var polymer = data[0].split(''), rules = [],
    insert = (polymer) => insertion(polymer).concat(polymer.split('')[polymer.length-1])

data[1].split(/\n/).map(a=>{
    let tokens = a.split(/\s->\s/)
    rules[tokens[0]] = tokens[1]
})

function insertionPair([fst,snd], n) {
    let sep = rules[fst+snd]
    let left = [], right = []
    for(let i=0; i<n; i++) {
        left.push(rules[fst+sep])
        right.push(rules[sep+snd])
        fst = left[left.length-1]
        snd = right[right.length-1]
    }
    return left.concat(sep).concat(right.reverse()).join('')
    // if(n==0) return sep;
    // return insertionPair(fst+sep,n-1)+ sep + insertionPair(sep+snd,n-1)     
}

function common(list, func) {
    let count = []
    Array.from(list).map(c=>count[c] = (count[c]??0) + 1)
    return func(...Object.values(count))
}

// console.log(rules)
// let res = insert(polymer);
// console.log(polymer);
// [...Array(2)].map(_=>{
    // console.log(res)
    // res=insert(res)
// })
console.log(polymer.slice(0,2))
// for(let i =0; i < polymer.length)
console.log(insertionPair(polymer[0]+polymer[1],4))
// console.log(common(res,Math.max) - common(res, Math.min))