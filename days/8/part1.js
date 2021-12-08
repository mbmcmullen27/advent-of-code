const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>{
        return {
            signals: e.split('|')[0].split(/\s/).slice(0,-1),
            output: e.split('|')[1].split(/\s/).slice(1),
        }
    })

let result = data.map(display=>{
    return display.output.reduce((acc,val) => 
       [2,3,4,7].includes(val.length)? ++acc : acc
    ,0)
})

console.log(result.reduce((a,b)=>a+b,0))