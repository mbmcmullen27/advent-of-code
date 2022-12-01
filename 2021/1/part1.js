const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map((e)=>parseInt(e))

let res = data.reduce((acc, e, i, arr) => (i > 0 && e>arr[i-1]) ? ++acc : acc,0);
console.log(res);

