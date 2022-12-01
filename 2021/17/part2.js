// target area: x=56..76, y=-162..-134
const input = require('fs').readFileSync('input', 'utf8'),
    xrange = input.match(/(?<=x=)[^,]*/)[0].split('..'),
    yrange = input.match(/(?<=y=).*/)[0].split('..'),
    target = { 
        x: [parseInt(xrange[0]), parseInt(xrange[1])],
        y: [parseInt(yrange[0]), parseInt(yrange[1])]
    }

function launch(velocity) {
    let pos = [0,0], peak, res, x, y
    while(!test(pos)) {
        [x,y] = pos

        if (velocity[1] == 0) peak = y
        if ( x > target.x[1]) return {hit: false}
        if (velocity[0] == 0 && x < target.x[0])  return {hit: false}
        if (velocity[1] < 0 && y < target.y[0]) return {hit: false}

        res = step(pos, velocity)
        pos = res.pos
        velocity = res.velocity
    }
    return {hit: true, peak: peak}
}

function step([x, y], [xv, yv]) {
    return {
        pos: [x+xv, y+yv],
        velocity: [drag(xv), --yv] 
    }
}

function drag(xv) {
    if(xv>0) return --xv
    if(xv==0) return 0
    if(xv<0) return ++xv
}

function test([x,y]) {
    return     x <= target.x[1] && x >= target.x[0] 
            && y <= target.y[1] && y >= target.y[0]
}

function partTwo(){
    let velocity = [1,0],
        arr = Array(0),
        len, res

    for(let j = 0; j <= target.x[1]; j++) {
        velocity = [j,-1 - Math.abs(target.y[0])]
        arr = arr.concat([...Array(Math.abs(velocity[1])*2)].map((_)=> {
            velocity[1]++
            res = launch(velocity)
            return {hit:res.hit, peak:res.peak}
        }).filter(x=>x.hit == true))
    }
    
    return arr
}

console.log(partTwo().length)