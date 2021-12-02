const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)

var depth = 0;
var pos = 0;

data.map((e)=>{
    var tokens = e.split(/\W/)
    var direction = tokens[0]
    var magnitude = parseInt(tokens[1])
    switch(direction) {
        case 'forward': pos += magnitude; break;
        case 'down': depth += magnitude; break;
        case 'up': depth -= magnitude; break;
    }
})

console.log(depth * pos);