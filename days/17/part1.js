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
    let pos = [0,0],res,x,y
    while(!test(pos)) {
        // console.log(pos)
        // console.log(velocity)
        let [x,y] = pos
        // console.log(`${x} ${y}`)
        if ( x > target.x[1]) return false
        if (velocity[0] == 0 && x < target.x[0]){
            console.log(`missed @ ${pos} -> ${velocity}`)
            return false
        } 
        if (velocity[1] < 0 && (y < target.y[0])){
            console.log(`missed @ ${pos} -> ${velocity}`)
            return false
        } 
        let res = step(pos, velocity)
        pos = res.pos
        velocity = res.velocity
    }
    console.log(`landed @ ${pos} -> ${velocity}`)
    return true
}

function step([x, y], [xv, yv]) {
    let next = drag(xv)
    let res = {
        pos: [x+xv, y+yv],
        velocity: [drag(xv), --yv] 
    }
    // console.log(res.pos)
    return res
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


function partOne(){
    let velocity = [1,0]
    // launch([11,30])
    console.log(target)
    while(!launch(velocity)){
        velocity[0]++
        console.log(velocity)
    } 
    console.log(`${velocity} -> ${launch(velocity)}`)
    while(launch(velocity)) {
        velocity[1]++
        console.log(velocity)
    }
    console.log(`${velocity} -> ${launch(velocity)}`)

    console.log(launch([9,30]))
    
    // console.log(`${velocity} -> ${launch(velocity)}`)
}

partOne()