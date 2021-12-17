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
    let pos = [0,0], peak
    while(!test(pos)) {
        // console.log(pos)
        // console.log(velocity)
        let [x,y] = pos
        if(velocity[1] == 0) peak = y
        // console.log(`${x} ${y}`)
        if ( x > target.x[1]) return {hit: false}
        if (velocity[0] == 0 && x < target.x[0]){
            // console.log(`missed @ ${pos} -> ${velocity}`)
            return {hit: false}
        } 
        if (velocity[1] < 0 && (y < target.y[0])){
            // console.log(`missed @ ${pos} -> ${velocity}`)
            return {hit: false}
        } 
        let res = step(pos, velocity)
        pos = res.pos
        velocity = res.velocity
    }
    // console.log(`landed @ ${pos} -> ${velocity}`)
    return {hit: true, peak: peak}
}

function step([x, y], [xv, yv]) {
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
    console.log(target)

    let arr = Array(0);

    for(let j = 0; j <= target.x[1]; j++) {
        velocity = [j,0]
        arr = arr.concat([...Array(500)].map((_)=> {
            velocity[1]++
            let res = launch(velocity)
            return {hit:res.hit,v:velocity.slice(), peak:res.peak}
        }).filter(x=>x.hit == true))
    }
    
    console.log(arr)
}

partOne()