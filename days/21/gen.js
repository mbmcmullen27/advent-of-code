const { generatePrimeSync } = require('crypto')

const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n/)
    .map(l=>parseInt(l.split(/: /)[1]))
    
        
class Player {
    constructor(pos, score, rolls) {
        this.location = pos
        this.pos = this.position(pos)
        this.pos.next()
        
        this.score = score??0
        this.rolls = rolls??[]
    }

    * position(start) {
        var spot = start
        var spaces = yield spot
        while(true) {
            spot += spaces
            while (spot > 10) spot -=10        
            this.score += spot
            this.location = spot
            spaces = yield spot
        }
    }

    advance() {
        this.pos.next(this.rolls.reduce((a,b)=>a+b,0))
        this.rolls = []
    }
    
    roll(n) {
        if (this.rolls.length < 3) this.rolls.push(n)
        if (this.rolls.length == 3) this.advance()
    }

    copy() {
        return new Player(this.location, this.score, this.rolls.concat())
    }

    copy3(){
        return [...Array(3)].map(_=> this.copy())
    }
}

console.log(data)
var players = data.map(x=>new Player(x))

// console.log(players)
// console.log(players[0].pos.next(1).value);
// console.log(`score ${players[0].score}`)
// console.log(players[0].pos.next(1).value);
// console.log(players[0].pos.next(1).value);
// console.log(`score: ${players[0].score}`)
// // console.log(players[1].pos.next(1).value);
// // console.log(`score: ${players[1].score}`)

// for(let player of players){
//     // console.log(player.pos.next(1).value)
//     player.roll(1)
//     player.roll(1)
//     player.roll(1)
//     player.roll(1)
// }

// let p3 = players[0].copy()
// console.log('player3:');
// p3[0].roll(5)
// p3[1].roll(8)
// p3[1].roll(10)
// console.log(p3)

console.log(players)

function play(){
    let games = [players], finished = []
    // console.log(games)
    
    while(games.length > 0) {
        let game = games.pop()
        for(i in game) {
            let opponent = i == 0 ? game[1].copy() : game[0].copy()
            game[i].copy3().map((p,j)=>{
                let g = i == 0 ? [p,opponent] : [opponent,p]
                p.roll(j+1)
                if(p.score > 20) finished.push(g)
                else games.push(g)
            })
        }
    }
}

play()