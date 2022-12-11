class Monkey {
    constructor(arr){
        this.items 
            = arr[1].split(/:/)[1]
                    .split(/,/)
                    .map(x=>BigInt(x))
        this.operation 
            = arr[2].split(/:/)[1]    
                    .match(/old (.) (\d+|old)/).slice(1,3)
        this.test
            = BigInt(arr[3].split(/:/)[1]
                    .match(/divisible by (\d+)/)[1])
        this.pass
            = BigInt(arr[4].split(/:/)[1]
                    .match(/monkey (\d+)/)[1])
        this.fail
            = BigInt(arr[5].split(/:/)[1]
                    .match(/monkey (\d+)/)[1])
        this.inspections = BigInt(0)
    } 

    inspect(item) {
        this.inspections++
        return this.operate(item)
    }
    
    operate(item) {
        let op = this.operation
        switch(op[0]){
            case '+':
                return op[1] === 'old' ? item + item : item + BigInt(op[1])
            case '*':
                return op[1] === 'old' ? item * item : item * BigInt(op[1])  
        }
    }

    assess(item) { return item % this.test === BigInt(0)}

    throw(item) { return this.assess(item) ? this.pass : this.fail }
}

const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)
    .map(monkey=>monkey.split(/\n/))
    .map(yaml=> new Monkey(yaml))

for(let i = 0; i < 20; i++) {
    data.forEach((monkey, i )=> {
        // console.log(`monkey ${i} starting: ${monkey.items}`)
        while(monkey.items.length != 0){
            let item =  monkey.items.shift()
            let worry = monkey.inspect(item)
            let recipient = monkey.throw(worry)
            // console.log(`throwing ${worry} to Monkey[${recipient}]`)
            data[recipient].items.push(worry)
            // console.log('  '+data[recipient].items)
        }
    })
}

let results = data.map(m=>m.inspections).sort((a ,b) => {
  if(b > a) {
    return 1;
  } else if (b < a){
    return -1;
  } else {
    return 0;
  }
})
console.log(results[0]*results[1])
// 8100000000 low