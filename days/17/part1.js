// target area: x=56..76, y=-162..-134
const input = require('fs').readFileSync('input', 'utf8'),
    xrange = input.match(/(?<=x=)[^,]*/)[0].split('..'),
    yrange = input.match(/(?<=y=).*/)[0].split('..'),
    target = { 
        x: [parseInt(xrange[0]), parseInt(xrange[1])],
        y: [parseInt(yrange[0]), parseInt(yrange[1])]
    }

console.log(target)

function launch(velocity) {
    let pos = [0,0]
    while(!test(pos)) {
        // if (x >= 0 && x > x.target[1]) return false
        // if (y < y.target[0]) return false
        ({pos, velocity} = step(pos, velocity))
    }
}

function step([x, y], [xv, yv]) {
    return {
        pos: [x+xv, y+yv],
        velocity: [drag(xv), --yv] 
    }
}

function drag(xv) {
    if(xv>0) return xv--
    if(xv==0) return 0
    if(xv<0) return xv++
}

function test([x,y]) {
    return     x <= target.x[1] && x >= target.x[0] 
            && y <= target.y[1] && y >= target.y[0]
}