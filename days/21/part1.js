const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(l=>parseInt(l.split(/: /)[1]))


console.log(data)

var total = 0

function* roll() {
    var i = 0
    while(true) {
        i++
        total++
        if (i > 100) i -= 100
        yield i
    }
}

function* move(start) {
    var pos = start
    var spaces = yield pos
    while(true) {
        pos += spaces
        console.log(`spaces ${spaces}`)
        if (pos > 10) pos -=10        
        spaces = yield pos
    }
        
}

var dice = roll(),
    step = () => [...Array(3)].reduce((a,_)=>a+dice.next().value,0)

// console.log(step())
// console.log(total)

var board = move(1)
board.next()
console.log(board.next(step()).value)