const data = require('fs')
    .readFileSync('input', 'utf8')
    .split(/\n*--- scanner \d+ ---\n/)
    .slice(1)
    .map(x=>x.split(/\n/)
             .map(e=>e.split(/,/)
                      .map(n=>parseInt(n))))

// console.log(data.map(x=>x.length))
console.log(data[0]);
console.log(data[1]);