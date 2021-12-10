const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)

var res = data.map((line)=>{
    var stack = []
    for( c in line){
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
    return stack
})
.filter(x=>!Number.isInteger(x))
.map((line)=>{
    return line.reduceRight((sum,c,i)=>{
        switch(c) {
            case '(': return (sum * 5) + 1
            case '[': return (sum * 5) + 2
            case '{': return (sum * 5) + 3
            case '<': return (sum * 5) + 4
        }
    },0)
}, 0)
res.sort((a,b)=> b-a)
console.log(res[(res.length-1)/2])
// .reduce((a,b)=>a+b))