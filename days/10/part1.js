const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)

// console.log(data[0][1])
console.log(data.map((line)=>{
    var stack = []
    for( c in line){
        console.log(`${c} : ${stack}`)
        switch (line[c]) {
            case '{': 
            case '(': 
            case '[': 
            case '<': 
                stack.push(line[c])
                break;
            case '}':
                if (stack.at(-1) == '{') stack.pop()
                else return 1197
                break;
            case ')':
                if (stack.at(-1) == '(') stack.pop()
                else return 3
                break;
            case ']':
                if (stack.at(-1) == '[') stack.pop()
                else return 57
                break;
            case '>':
                if (stack.at(-1) == '<') stack.pop()
                else return 25137
                break;
        }
    }
    return 0
}).reduce((a,b)=>a+b))