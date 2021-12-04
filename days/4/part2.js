const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

var boards, called;

function reset() {
    called = data[0].split(/\W/).map(n=>parseInt(n))
    boards = data.slice(1).map((board)=>{
        return {
            rows: board.split(/\n\W*/)
                       .map(row=>row.split(/\W+/)
                                    .map(n=>parseInt(n))),
            hits: {
                x: Array(5).fill(0),
                y: Array(5).fill(0),
            }
        }
    })
}

function searchBoard(board, calledNumber) {
    board.rows.map((e,row)=>{
        if (e.includes(calledNumber)) {
            let column = e.indexOf(calledNumber)
            board.hits.x[column]++
            board.hits.y[row]++
            delete e[column]
        }
    })
    return board
}

function partOne() {
    reset();
    var winner;
    var last;

    for (number in called) {
        for (e in boards) {
            let next = searchBoard(boards[e],called[number])
            if (next.hits.x.includes(5) ||
                    next.hits.y.includes(5)) {
                next.rows = next.rows.flat()
                winner = next
                last = called[number]
            } 
        }
        if (winner !== undefined) break; 
    }

    return winner.rows.flat().reduce((a,b)=>a+b,0) * last
}

function  partTwo() {
    reset();
    var winners = Array(boards.length);
    var last;
    var index;
    
    for (number in called) {
        for (e in boards) {
            if (winners[e]) continue;
            let next = searchBoard(boards[e],called[number])
            if (next.hits.x.includes(5) ||
                    next.hits.y.includes(5)) {
                next.rows = next.rows.flat()
                winners[e] = next
                index = e;
                last = called[number]
            } 
        }
    }
    
    winner = boards[index]
    return winner.rows.flat().reduce((a,b)=>a+b,0) * last
}

console.log(partOne());
console.log(partTwo());