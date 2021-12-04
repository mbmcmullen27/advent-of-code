const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n\n/)

const called = data[0].split(/\W/).map(n=>parseInt(n))
const boards = data.slice(1).map((board)=>{
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

console.log(boards[32])
console.log(`Will call 23: ${called.includes(23)} index: ${called.indexOf(23)}`)

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

let score = winner.rows.flat().reduce((a,b)=>a+b,0) * last

console.log(called)
console.log(`WINNER ${boards.indexOf(winner)} on a ${last}! Scored ${score} points!`)
console.log(winner)
