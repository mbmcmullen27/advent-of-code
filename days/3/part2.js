const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)

    
function mostCommon(array, index) {
    return array.reduce((prev, e) => prev + parseInt(e[index]),0) >= array.length/2 ? 1 : 0
}

function partOne() {
    var gamma = Array(12);

    [...Array(12)].map((_, i)=>{
        gamma[i] = mostCommon(data, i); 
    })
    
    var epsilon = gamma.map((d) => 1 - d).join('')
    gamma = gamma.join('')

    console.log(parseInt(gamma,2) * parseInt(epsilon,2))
}

function partTwo() {
    var co2 = data, 
        oxygen = data,
        len = (arr)=>arr.length > 1;

    for ( var i = 0; len(co2) && len(oxygen) && i < 12; i++) {
        if (len(co2)) co2 = co2.filter((e) => e[i] != mostCommon(co2, i))
        if (len(oxygen)) oxygen = oxygen.filter((e) => e[i] == mostCommon(oxygen, i))
    }
    
    co2 = parseInt(co2[0], 2)
    oxygen = parseInt(oxygen[0], 2)

    console.log(co2 * oxygen)
}

partOne();
partTwo();