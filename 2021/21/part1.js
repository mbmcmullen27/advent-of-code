const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(l=>parseInt(l.split(/: /)[1]))


console.log(data)

var players = data.map(x=>move(x)),
    scores = players.map(_=>0),
    total = 0,
    dice = roll(),
    step = () => [...Array(3)].reduce((a,_)=>a+dice.next().value,0)

players.map(x=>x.next())

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
        while (pos > 10) pos -=10        
        spaces = yield pos
    }
}

function play(){
    console.log(players)
    console.log(scores)
    
    loop:
    while(true) {
        for(i in players) {
            let steps = step(), val = players[i].next(steps).value
            scores[i] += val
            console.log(`${steps} spaces for player ${i}, position = ${val}`)
            if(scores[i] > 1000) break loop
        }
    }

    return scores.filter(x=>x<1000)[0] * total

}

console.log(play())