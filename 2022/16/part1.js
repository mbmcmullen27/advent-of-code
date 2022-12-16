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

function dfs(node,prev, timeleft, pressure, open) {
    if (timeleft <= 0 || open.length == contributingValves.length) 
        return pressure
    else {
        let openValve = 0
        let keepClosed = 0
        if (timeleft > 1 && node.rate > 0 && !open.includes(node.valve)) {
            if(--timeleft == 0) openValve = pressure
            let openList = [...open, node.valve]
            let p = (node.rate*timeleft)
            openValve = node.adjacent.reduce((max,n)=>{
                let pathPressure = dfs(graph[n], node.valve, timeleft - 1, pressure + p, openList)
                if (pathPressure > max) return pathPressure
                else return max
            }, 0)
        } 

        keepClosed = node.adjacent.reduce((max,n)=>{
            if (prev == n) return max
            let pathPressure = dfs(graph[n], node.valve, timeleft - 1, pressure, open)
            if ( pathPressure > max) return pathPressure
            else return max
        }, 0)

        return Math.max(openValve, keepClosed)
    }
}

console.log(dfs(graph['AA'], null, 30, 0, []))

// 1881 high