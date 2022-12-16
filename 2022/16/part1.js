const { time } = require('console');
const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
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

function calculatePressure(pressure, open) {
    if (open === []) return pressure
    return open.reduce((sum,v)=>sum+graph[v].rate, pressure)
}

function dfs(node, timeleft, pressure, open) {
    console.log(`node: ${node.valve} pressure: ${pressure} timeleft: ${timeleft}`)
    console.log(open)
    let p = calculatePressure(pressure, open)
    if (timeleft <= 0) 
        return p
    else {
        let keepClosed = node.adjacent.reduce((max,n)=>{
            console.log(`move to ${n}, keep ${node.valve} closed`)
            let pathPressure = dfs(graph[n], timeleft - 1, p, [...open])
            if ( pathPressure > max) return pathPressure
            else return max
        }, 0)

        if(--timeleft == 0) return p
        p = calculatePressure(p, open)
        
        let openValve = 0
        if (node.rate > 0 && !open.includes(node.valve)) {
            let openNode =  [...open, node.valve]
            openValve = node.adjacent.reduce((max,n)=>{
                console.log(`open node ${node.valve} and move to ${n}`)
                let pathPressure = dfs(graph[n], timeleft - 1, p, openNode)
                if (pathPressure > max) return pathPressure
                else return max
            }, 0)
        } else {

        }

        return Math.max(openValve, keepClosed)
    }
}

console.log(dfs(graph['AA'], 30, 0, []))
