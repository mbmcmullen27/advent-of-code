const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)

    
function partOne() {
    var gammaValues = Array(12);

    [...Array(12)].map((_, i)=>{
        gammaValues[i] = data.reduce((prev, e)=>
            prev + parseInt(e[i])
        ,0)
    })
    
    var gamma = gammaValues.map((e)=>e>data.length/2 ? 1:0).join('')
    var epsilon = gamma.split('').map((d)=>1 -d).join('')
    
    console.log(parseInt(gamma,2) * parseInt(epsilon,2))
}

partOne();