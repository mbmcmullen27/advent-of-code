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

// for each scanner
    // for all other scanners
        // for each possible orientation
            // for each beacon calculate possible origin
            // compare possible oriins for each beacon
            //

let res = data.map((x,i)=>{
    return data.map((n,j)=>{
        //
    })
})

            
/* 
x, y, z
x,-y,-z
x, z,-y
x,-z, y
*/