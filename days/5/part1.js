const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((x)=>{
        let tokens = x.split(/\s/)
        return {
            start : [parseInt(tokens[0].split(/,/)[0]),
                     parseInt(tokens[0].split(/,/)[1])],
            end : [parseInt(tokens[2].split(/,/)[0]),
                    parseInt(tokens[2].split(/,/)[1])]
        }
    })

let lines = data.filter((x)=>{
    return x.start[0] == x.end[0] ||
        x.start[1] == x.end[1] 
})

console.log(lines.length)

var board = Array.from(Array(1000), ()=>Array(1000).fill(0));

lines.map((line, k)=>{
    // let xleg = line.start[0] - line.end[0]
    // let yleg = line.start[1] - line.end[1]
    // let length = Math.sqrt(xleg**2 + yleg**2)
    var length;
    if (line.start[0] == line.end[0])
        length = line.end[1] - line.start[1]
    else    
        length = line.end[0] - line.start[0]
    
    
    for(let i = 0; i != length; i < length ? i++ : i--) {
        if (line.start[0] == line.end[0]){
            board[line.start[0]][line.start[1] + i]++;
        }
        if (line.start[1] == line.end[1]) {
            board[line.start[0] + i][line.start[1]]++;
        }
    } 
    board[line.end[0]][line.end[1]]++;
})

board = board.flat().filter(x=>x>1);
console.log(board)
console.log(board.length)