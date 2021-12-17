const data = require('fs')
    .readFileSync('input','utf8')
    .split('')
    .map(d=>("000"+parseInt(d,16).toString(2)).slice(-4))
    .join('')


Object.prototype.parse = function(i,n) {return parseInt(this.substr(i,n),2)} 

function packet(data) {
    let version = data.parse(0,3),
        type = data.parse(3,3),
        payload = data.substr(6)
    
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
            chunk = data.slice(16,16+length)
            let k = 0;
            while(chunk.length > 0) {
                let p = packet(chunk)
                subpackets.push(p)
                chunk = chunk.slice(p.payload.length)
            }
            length = 6 + 1 + 15 + length // header + lengthId + length
            break;
        case '1':
            length = data.parse(1,11)
            chunk = data.slice(12)
            for (let i = 0; i < length; i++) {
                let p = packet(chunk)
                subpackets.push(p)
                chunk = chunk.slice(p.payload.length)
            }
            length =  6 + 1 + 11 + subpackets.reduce((a,b)=>a+b.payload.length,0)
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

    return {lexeme: lexeme, length: length+6 ,value: parseInt(lexeme,2)}
}

function versionSum(p) {
    if (p.type == 4) return p.version
    else return p.version + p.payload.subpackets.reduce((a,b)=>a+versionSum(b),0)
}

function evaluate(p){
    let sub;
    switch (p.type) {
        case 0:
            return p.payload.subpackets.reduce((a,b)=>{
                return a+evaluate(b)
            },0)
        case 1:
            return p.payload.subpackets.reduce((a,b)=>{
                return a*evaluate(b)
            },1)
        case 2:
            return Math.min(...p.payload.subpackets.map(a=>evaluate(a)))
        case 3:
            return Math.max(...p.payload.subpackets.map(a=>evaluate(a)))
        case 4:
            return p.payload.value
        case 5:
            sub = p.payload.subpackets
            return evaluate(sub[0]) > evaluate(sub[1]) ? 1 : 0 
        case 6:
            sub = p.payload.subpackets
            return evaluate(sub[0]) < evaluate(sub[1]) ? 1 : 0 
        case 7:
            sub = p.payload.subpackets
            return evaluate(sub[0]) == evaluate(sub[1]) ? 1 : 0 
    }

}

let p = packet(data)
// let p = packet('110100101111111000101000')
console.log(p)
// console.log(p.payload.subpackets)
console.log(evaluate(p))

