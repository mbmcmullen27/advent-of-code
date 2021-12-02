const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)

var depth = 0;
var pos = 0;
var aim = 0;

data.map((e)=>{
    var tokens = e.split(/\W/)
    var direction = tokens[0]
    var magnitude = parseInt(tokens[1])
    switch(direction) {
        case 'forward':{
            pos += magnitude; 
            depth += aim * magnitude;
            break;
        } 
        case 'down':{
            aim += magnitude; 
            break;
        }
        case 'up':{
            aim -= magnitude;
            break;
        } 
    }
})

console.log(depth * pos);