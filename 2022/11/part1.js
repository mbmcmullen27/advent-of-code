class Monkey {
    constructor(arr){
        this.items 
            = arr[1].split(/:/)[1]
                    .split(/,/)
                    .map(x=>parseInt(x))
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
        this.inspections = 0
    } 

    inspect(item) {
        this.inspections++
        return Math.floor(this.operate(item)/3)
    }
    
    operate(item) {
        let op = this.operation
        switch(op[0]){
            case '+':
                return op[1] === 'old' ? item + item : item + parseInt(op[1])  
            case '*':
                return op[1] === 'old' ? item * item : item * parseInt(op[1])  
        }
    }

    assess(item) { return item % this.test === 0}

    throw(item) { return this.assess(item) ? this.pass : this.fail }
}

const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n\n/)
    .map(monkey=>monkey.split(/\n/))
    .map(yaml=> new Monkey(yaml))

for(let i = 0; i < 20; i++) {
    data.forEach((monkey, i ) => {
        console.log(`monkey ${i} starting: ${monkey.items}`)
        while(monkey.items.length > 0){
            let item =  monkey.items.shift()
            let worry = monkey.inspect(item)
            let recipient = monkey.throw(worry)
            console.log(`throwing ${worry} to Monkey[${recipient}]`)
            data[recipient].items.push(worry)
            console.log('  '+data[recipient].items)
        }
    })
}

let results = data.map(m=>m.inspections).sort((a,b)=>b-a)
console.log(results[0]*results[1])