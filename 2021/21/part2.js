const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(l=>parseInt(l.split(/: /)[1]))

class Player {
    constructor(pos, score) {
        this.players = players.map(x=>move(x)),
        this.score = scores??Array(players.length).fill(0)
        this.dice = roll()

        this.players.map(x=>x.next())
    }

    step() {
        return [...Array(3)]
            .reduce((a,_)=>a+this.dice.next().value,0)
    }

    * move(start) {
        var pos = start,
            spaces = yield pos

        while(true) {
            pos += spaces
            while (pos > 10) pos -=10        
            spaces = yield pos
        }
    }
}

function* roll() {
    for(let i=0;;i++) {
        yield [
            new Player(Player.pos + 1, Player.scores),
            new Player(Player.pos + 2, Player.scores),
            new Player(Player.pos + 3, Player.scores),
        ]
    }
}

function play(){
    console.log(players)
    console.log(scores)
    
    loop:
    while(true) {
        for(i in players) {
            players[i].step()
            if(scores[i] > 21) break loop
        }
    }
}

console.log(play())