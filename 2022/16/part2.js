const { time } = require('console');
const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line => {
        return {
            valve:      line.match(/^Valve (\w{2})/)[1],
            rate:       parseInt(line.match(/rate=(\d+);/)[1]),
            adjacent:   line.match(/([A-Z]{2},?\s?)+$/)[0].split(/,\s/),
        }
    })

const graph = {}
data.forEach(v=>graph[v.valve] = v)
let contributingValves = data.filter(x=>x.rate>0)
console.log(contributingValves)

function openValve(node, status) {
    status.open = [...open, node.valve]
    status.pressure += (node.rate*timeleft)
}

function move(node, prev) {
    node.adjacent.reduce((max,n)=>{
            // console.log(`move to ${n}, keep ${node.valve} closed`)
            if (prev == n) return max
            let pathPressure = dfs(graph[n], node.valve, timeleft - 1, pressure, open)
            if ( pathPressure > max) return pathPressure
            else return max
        }, 0)
}

function dfs(me, elephant, myPrev, elephantPrev, status) {
    let { timeleft, pressure, open } = status
    // console.log(`\nnode: ${node.valve} pressure: ${pressure} timeleft: ${timeleft}`)
    // console.log(open)
    if (timeleft <= 0 || open.length == contributingValves.length) 
        return pressure
    else {
        let openValve = 0
        let keepClosed = 0

        if (timeleft > 1 && node.rate > 0 && !open.includes(node.valve)) {
            openValve = openValve(me, structuredClone(status)) 
        } 
        if (timeleft > 1 && node.rate > 0 && !open.includes(node.valve)) {
            openValve = openValve(me) 
        } 

        keepClosed = move

        return Math.max(openValve, keepClosed)
    }
}

let status = {
    pressure: 0,
    timeleft: 30,
    open: []
}

console.log(dfs(graph['AA'], graph['AA'], status, null, null))
