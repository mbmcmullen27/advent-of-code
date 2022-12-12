class Monkey {
    constructor(arr){
        this.items 
            = arr[1].split(/:/)[1]
                    .split(/,/)
                    .map( x=> ['noop',x] )
        this.operation 
            = arr[2].split(/:/)[1]    
                    .match(/old (.) (\d+|old)/).slice(1,3)
        this.test
            = parseInt(arr[3].split(/:/)[1]
                    .match(/divisible by (\d+)/)[1])
        this.pass
            = parseInt(arr[4].split(/:/)[1]
                    .match(/monkey (\d+)/)[1])
        this.fail
            = parseInt(arr[5].split(/:/)[1]
                    .match(/monkey (\d+)/)[1])
        this.inspections = parseInt(0)
    } 

    inspect(item) {
        this.inspections++
        return this.operate(item)
    }
    
    operate(item) {
        let op = this.operation
        if (op[0] === item[0][0]) item.splice(item.length-2,0,op[1]) 
        else item = [op[0], op[1] ,item]
        return item
    }

    assess(item) { 
      console.log(`***** begin assess ${this.test} *******`)
      console.log(item)
      let ret = false,
          history = item,
          length = history.length
      if (history[0] === 'noop') return history[1] % this.test === 0
      else if (history[0] === '*'){
        let total = history.slice(1, length-1).reduce((total,a)=>total*a)
        // if (history.slice(1, length-1).some(x=>
        //   x % this.test === 0
        // )){
        if (total % this.test === 0){
          ret = true
        } else {
          ret = this.assess(history[length-1])
        } 
      } else if (history[0] === '+') {
        let sum = history.slice(1, length-1).reduce((sum,x)=>sum+x)
        if (sum % this.test === 0 && this.assess(history[length-1])){
          ret = true
        }
      }

      console.log("***** end assess *******\n")
      return ret
    }

    throw(item) { return this.assess(item) ? this.pass : this.fail }
}

const fs = require('fs');
const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split(/\n\n/)
    .map(monkey=>monkey.split(/\n/))
    .map(yaml=> new Monkey(yaml))

console.log(data.map(x=>x.operation))

for(let i = 0; i < 5; i++) {
    data.forEach((monkey, i )=> {
      console.log("----------------------")
        console.log(`monkey ${i} starting: `)
        console.log(monkey.items)
        while(monkey.items.length != 0){
          let item =  monkey.items.shift()
          console.log( item )
          let worry = monkey.inspect(item)
          let recipient = monkey.throw(worry)
          console.log(worry)
          console.log(`throwing to Monkey[${recipient}]`)
          data[recipient].items.push(worry)
        }
    })
}


// let results = data.map(m=>m.inspections).sort((a ,b) => b - a)
console.log(data.map(m=>m.inspections))
// console.log(results[0]*results[1])
// 8100000000 low
// 8100180000 low
