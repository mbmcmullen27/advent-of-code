const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var polymer = data[0].split(''), rules = []

data[1].split(/\n/).map(a=>{
    let tokens = a.split(/\s->\s/)
    rules[tokens[0]] = tokens[1]
})

function insertionPair([fst,snd], n) {
    // if (str.length > 2){
    //     return insertionPair(str.slice(0,str.length/2),n)
    //         .concat(insertionPair(str.slice(str.length/2),n))
    // } else if (n==0) {
    //     return [rules[str]]   
    // } else {
    //     return insertionPair(str[0]+rules[str],n-1).concat(insertionPair(rules[str]+str[1], n-1))
    // }
    let sep = rules[fst+snd]
    if(n==0) return sep;
    return insertionPair(fst+sep,n-1).concat(sep).concat(insertionPair(sep+snd,n-1))

}

function common(list, func) {
    let count = []
    Array.from(list).map(c=>count[c] = (count[c]??0) + 1)
    return func(...Object.values(count))
}

console.log(polymer.slice(0,2))

console.log(insertionPair(polymer[0]+polymer[1],2))
let res = polymer[0];
for(let i = 0;i<polymer.length-1;i++){
    res+=polymer[i]+(insertionPair(polymer[i]+polymer[i+1],39))
}
res+=polymer[polymer.length-1]
console.log(res)
console.log(common(res,Math.max) - common(res, Math.min))
