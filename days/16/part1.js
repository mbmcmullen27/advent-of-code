const data = require('fs')
    .readFileSync('input','utf8')
    .split('')
    .map(d=>("000"+parseInt(d,16).toString(2)).substr(-4))
    .join('')

console.log((data))
// console.log(`${}\n`)

function packet(data) {
    let version = parseInt(data.substr(0,3),2),
        type = parseInt(data.substr(3,3),2)
    console.log(version)
    console.log(type)
    return {
        version: version,
        type:    type,
        payload: data.substr(6)
    }
}

console.log(data)
let {type} = packet(data)
console.log(type)
