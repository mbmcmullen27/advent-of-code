const data = require('fs')
    .readFileSync('input','utf8')
    .split(/\n/)
    .map(l=>{
        return {
            value: l.split(/\s/)[0] == 'on' ? 1 : 0,
            coords: l.split(/\s/)[1].split(/,/)
                     .map(c=>
                        c.split(/\.\.|\w=/)
                         .slice(1)
                         .map(x=>parseInt(x)))
        }
    })

let init = data.filter(l=>l.coords[0][0]<=50 && l.coords[0][1] >=50)
console.log(init.map(x=>x.coords))