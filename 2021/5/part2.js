const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((x)=>{
        let tokens = x.split(/\s/),
            parse = (i,j) => parseInt(tokens[i].split(/,/)[j])

        return {
            start : [parse(0,0), parse(0,1)],
            end : [parse(2,0), parse(2,1)]
        }
    })

var board = Array.from(Array(1000), ()=>Array(1000).fill(0));

data.map((line, k)=>{
    let cursor = [line.start[0],line.start[1]],
        m = [   line.end[0] - line.start[0],
                line.end[1] - line.start[1]]

    let atEnd = _ => cursor.toString() === line.end.toString()
    
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
console.log(board.length)