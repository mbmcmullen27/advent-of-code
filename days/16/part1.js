const data = require('fs')
    .readFileSync('input','utf8')
    .split('')
    .map(d=>("000"+parseInt(d,16).toString(2)).slice(-4))
    .join('')


Object.prototype.parse = function(i,n) {return parseInt(this.substr(i,n),2)} 

// console.log(`${}\n`)

function packet(data) {
    // console.log(data)
    let version = data.parse(0,3),
        type = data.parse(3,3),
        payload = data.substr(6)
    
    // console.log(type)
    if (type == 4) payload = literal(payload)
    else payload = operator(payload)

    return {
        version: version,
        type:    type,
        payload: payload,
    }
}

function operator(data) {
    let id = data[0], subpackets = [], length, chunk
    switch(id){
        case '0':
            length = data.parse(1,15)
            chunk = data.slice(16)
            let clen = chunk.length
            chunk = chunk.slice(0,16+length)
            console.log(chunk)
            while(length > 0) {
                let p = packet(chunk)
                subpackets.push(p)
                chunk = chunk.slice(p.payload.length)
                length -= p.payload.length
            }
            length = 6 + 1 + 15 + clen // header + lengthId + length
            break;
        case '1':
            length = data.parse(1,11)
            chunk = data.slice(12)
            console.log(chunk)
            for (let i = 0; i < length; i++) {
                let p = packet(chunk)
                subpackets.push(p)
                chunk = chunk.slice(p.payload.length)
            }
            length =  6 + 1 + 11 + chunk.length + subpackets.reduce((a,b)=>a+b.payload.length,0)
            break;
    }

    return {subpackets:subpackets,length: length}
}

function literal(data) {
    let lexeme = '', length = 5
    while (data[0] == 1){
        length+=5
        lexeme+=data.substr(1,4)
        data = data.slice(5)
    }
    lexeme+=data.substr(1,4)

    // console.log(lexeme)
    return {lexeme: lexeme, length: length+6 ,value: parseInt(lexeme,2)}
}

function versionSum(p) {
    console.log(p)
    if (p.type == 4) return p.version
    else return p.version + p.payload.subpackets.reduce((a,b)=>a+versionSum(b),0)
}

// console.log(`${data}\n`)
// let {type,length} = packet(data)
// console.log(data.slice(length))
// let test = '110100101111111000101000' // literal
// let test = '00111000000000000110111101000101001010010001001000000000' // operator lid=0
// let test = '11101110000000001101010000001100100000100011000001100000' // operator lid=1
// console.log(test)
// console.log(test.length)
// let p = packet(test)
// console.log(p)
// console.log(p.payload.subpackets)
// console.log('           '+p.version)
// console.log('           '+p.type)
// console.log(test)
console.log(data)
console.log(data.length)
let p = packet(data)
console.log(p)
console.log();
// console.log(p.payload)
// console.log(p.payload.subpackets[0].payload.subpackets[0].payload.subpackets.map(a=>a.payload))
// console.log(p.payload.subpackets[0].payload.subpackets.map(x=>x.payload))
console.log(p.payload.subpackets)
// console.log(p.payload.subpackets[0].payload.subpackets[0].payload.subpackets)
console.log(versionSum(p))
// console.log(p.payload.subpackets[0].payload.subpackets[0].payload)

