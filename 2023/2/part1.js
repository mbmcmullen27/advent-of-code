const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)
    .map(line=>{
      return {
        id: parseInt(line.match(/Game (\d+)/)[1]),
        grabs: line.split(/[:;]/).slice(1)
                    .map(grab=>{
                      let blue = grab.match(/(\d+) blue/),
                          green = grab.match(/(\d+) green/),
                          red = grab.match(/(\d+) red/)
                      return {
                        blue: blue ? parseInt(blue[1]) : 0,
                        green: green ? parseInt(green[1]) : 0, 
                        red: red ? parseInt(red[1]) : 0 
                      }
                    })
      }
    })

let possible = data.filter(game=> {
  return !game.grabs.map(grab=> 
    grab.blue <= 14 && grab.green <= 13 && grab.red <= 12
  ).includes(false)
}).reduce((acc,e)=>e.id+acc,0)


// console.log(data[0])
console.log(possible)