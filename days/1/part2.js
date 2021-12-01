const data = require('fs')
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>parseInt(e));

function partTwo(data) {
    return data.reduce(
        (acc, e, i, arr) => 
            i > 0 && windowSum(arr, i) > windowSum(arr, i-1) ? ++acc : acc
        , 0);
}

function partOne(data) {
    return data.reduce((acc, e, i, arr) => (i > 0 && e > arr[i-1]) ? ++acc : acc,0);
}

function windowSum(data, i) {
    return data.slice(i,i+3).reduce((x,y)=>x+y,0)
}

console.log(partOne(data))
console.log(partTwo(data))