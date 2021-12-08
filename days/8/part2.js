const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>{
        return {
            signals: e.split('|')[0].split(/\s/).slice(0,-1),
            output: e.split('|')[1].split(/\s/).slice(1),
            patterns: []
        }
    })


function segmentsInCommon(a,b) {
    return a.split('').reduce((acc,val)=>b.includes(val)?++acc:acc,0)
}

let result = data.map(display=>{
    let five = [], six = [], 
        patterns = display.patterns,
        equal = (a,b) => segmentsInCommon(a,b)==a.length && segmentsInCommon(a,b)==b.length;

    display.signals.map(e=>{
        switch (e.length) {
            case 2: patterns[1] = e; break; 
            case 3: patterns[7] = e; break;
            case 4: patterns[4] = e; break;
            case 5: five.push(e); break;
            case 6: six.push(e); break;
            case 7: patterns[8] = e; break;
        }
    })

    five.map(e=>{
        if(segmentsInCommon(patterns[1],e) == 2) patterns[3] = e
        else if(segmentsInCommon(patterns[4],e) == 3) patterns[5] = e
        else patterns[2] = e
    })

    six.map(e=>{
        if(segmentsInCommon(patterns[4],e) == 4) patterns[9] = e
        else if(segmentsInCommon(patterns[5],e) == 5) patterns[6] = e
        else patterns[0] = e
    })

    let out = display.output.map(e=>patterns.filter(x=>equal(x,e))).flat()
    return parseInt(out.map(e=>patterns.indexOf(e)).join(''))
})

// console.log(result)

console.log(result.reduce((a,b)=>a+b,0))