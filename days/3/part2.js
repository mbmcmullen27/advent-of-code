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
    
    var epsilon = gamma.map((d)=>1 -d).join('')
    gamma = gamma.join('')

    console.log(parseInt(gamma,2) * parseInt(epsilon,2))
}

function partTwo() {
    var common;
    
    var co2 = data;
    for ( var i = 0; co2.length > 1 && i < 12; i++) {
        common = mostCommon(co2, i)
        co2 = co2.filter((e)=> e[i] != common)
    }
    co2 = co2[0]
    
    var oxygen = data;
    for ( var i = 0; oxygen.length > 1 && i < 12; i++) {
        common = mostCommon(oxygen, i) 
        oxygen = oxygen.filter((e)=> e[i] == common)
    }
    oxygen = oxygen[0]
    
    console.log(parseInt(oxygen,2) * parseInt(co2,2))
}

partOne();
partTwo();