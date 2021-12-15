const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var polymer = data[0].split(''), rules = [], rulesOne = [],
    ins = (polymer) => insertion(polymer).concat(polymer.split('')[polymer.length-1])

data[1].split(/\n/).map(a=>{
    let tokens = a.split(/\s->\s/)
    rules[tokens[0]] = tokens[1]
    rulesOne[tokens[0]] = tokens[0][0].concat(tokens[1])
})

let expRule=[]
let exp2Rule=[]
let insertRule=[]
Object.keys(rules).map(([fst,snd])=>{
    let sep = rules[fst+snd],
        lsep = rules[fst+sep],
        rsep = rules[sep+snd] 
    expRule[fst+snd] = lsep+sep+rsep
    exp2Rule[fst+snd] = rules[fst+lsep] + lsep
                        + rules[lsep+sep] + sep
                        + rules[sep+rsep] + rsep
                        + rules[rsep+snd]
})

Object.keys(rules).map(([fst,snd])=>{
    let key = fst+snd
    // console.log(`key: ${key}`)
    let res = key;
    // console.log(`res: ${res}`);
    [...Array(10)].map(_=>{
        res=ins(res)
    })   
    insertRule[key]=res.slice(1,res.length-1)
})

function insertion([fst, snd, ...tail]) {
    if (tail.length == 0) return rulesOne[fst+snd]
    return rulesOne[fst+snd]+insertion([snd].concat(tail))
}

function insert([fst,snd]) {
    return expRule[fst+snd]
}

function insert2([fst,snd]) {
    return exp2Rule[fst+snd]
}

function insert3([fst,snd]) {
    return insertRule[fst+snd]
}

function common(list, func) {
    let count = []
    Array.from(list).map(c=>count[c] = (count[c]??0) + 1)
    return func(...Object.values(count))
}

console.log(rules)
console.log(expRule)
console.log(exp2Rule)
console.log(insertRule)

function step(template,f) {
    let res = [];
    for(let i = 0;i<template.length-1;i++){
        res.push(template[i])
        console.log(res)
        res.concat(f(template[i]+template[i+1]).split(''))
        // console.log(res)
        console.log(f(template[i]+template[i+1]).split(''))
    }
    res.concat(template[template.length-1])
    return res
}

let res = polymer;
[...Array(1)].map(_=>{
    // res=step(res,insert)
})
// console.log(common(res,Math.max) - common(res, Math.min))

res = polymer;
[...Array(1)].map(_=>{
    // res=step(res,insert2)
})
// console.log(common(res,Math.max) - common(res, Math.min))


console.log(polymer)
res1 = polymer;
// console.log(res1)
res2 = polymer.slice(polymer.length/2);
[...Array(4)].map(_=>{
    res1=step(res1,insert3)
})
// console.log(res1)
console.log(common(res1,Math.max) - common(res1, Math.min))

