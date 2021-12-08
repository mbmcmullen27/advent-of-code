const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>{
        return {
            signals: e.split('|')[0].split(/\s/).slice(0,-1),
            output: e.split('|')[1].split(/\s/).slice(1),
            patterns: Array(9)
        }
    })


console.log(data)

let result = data.map(display=>{
    let five,six = [], []
    display.signals.map(e=>{
        switch (e.length) {
            case 2: display.patterns[1] = e; break; 
            case 3: display.patterns[7] = e; break;
            case 4: display.patterns[4] = e; break;
            case 5: five.push(e); break;
            case 6: six.push(e); break;
            case 7: disaply.patterns[8] = e; break;
        }
    })
})

console.log(result.reduce((a,b)=>a+b,0))