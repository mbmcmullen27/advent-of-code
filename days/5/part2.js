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

// console.log(lines.length)

var board = Array.from(Array(1000), ()=>Array(1000).fill(0));

data.map((line, k)=>{
    let xleg = line.end[0] - line.start[0]
    let yleg = line.end[1] - line.start[1]
    let m = [xleg,yleg]
    let cursor = [line.start[0],line.start[1]]
    let atEnd = () => cursor.toString() === line.end.toString()
    
    console.log(cursor.toString())
    console.log(line.end.toString())
    console.log(m.toString())
    for(;!atEnd(); moveCursor(cursor, m)) {
        board[cursor[0]][cursor[1]]++
    } 

    board[line.end[0]][line.end[1]]++
})

function moveCursor(cursor, slope) {
    if(slope[0] < 0) cursor[0]--
    if(slope[0] > 0) cursor[0]++
    if(slope[1] < 0) cursor[1]--
    if(slope[1] > 0) cursor[1]++
}

board = board.flat().filter(x=>x>1);
console.log(board)
console.log(board.length)