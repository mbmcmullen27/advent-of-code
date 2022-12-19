const fs = require('fs');
const shape = fs
    .readFileSync('./rocks', 'utf8')
    .split(/\n\n/).map(r=>r.split(/\n/).map(x=>x.split('')))

const data = fs
    .readFileSync('./sampleInput', 'utf8')
    .split('')

let board = Array.from(Array(7), ()=>[]),
    boardHeight = 0

class Rock{
  constructor(shape) {
    this.shape = shape
    this.pos = [2, boardHeight + 3]
    this.resting = false
    this.height = shape.length
    this.width = shape.reduce((acc, line)=> {
      let w = line.filter(c=>c=='#').length
      if (w > acc) return w
      else return acc
    },0)
  }

  collides() {
    console.log(`y pos: ${this.pos[1]} height = ${this.height}`)
    if(this.pos[1] === this.height) return true
    this.shape.forEach((line, y) => {
      line.forEach((char, x) => {
        if (char === '#' && board[x+this.pos[0]][y+this.pos[1]] === '#') return true
      })
    })
    return false
  }

  moveDown() {
    console.log(`${this.pos} moving down`)
    this.pos[1]--
    if(this.collides()) {
      this.resting = true
      console.log("***** printing *****")
      this.shape.forEach((line, i)=> {
        for(j = this.pos[0]; j < this.pos[0] + width; j++) {
          board[j][i+this.pos[1]] = line[]
        }
      })
    }
  }

  jet(dir) {
    console.log(`${this.pos} jet ${dir}`)
    switch(dir) {
      case '<':
        if(this.pos[0] > 0) this.pos[0]--
        break;
      case '>':
        if(this.pos[0] + this.width < 7) this.pos[0]++
        break;
    }
  }
}

function* rocks() {
  let index = 0;
  while(true) yield new Rock(shape[index%4]), index++;
}

const drop = rocks()
const next = () => drop.next().value

// 2022 
for(let i = 0; i < 10; i++) {
  let current = next()
  // current = next()
  // console.log(current.shape[0])
  // console.log(Array.isArray(current.shape[0]))
  // board.splice(2,current.shape[0].length,...current.shape[0])
  // console.log(board)
  console.log(current.shape.join('\n'))
  while (!current.resting) {
    current.jet(data.splice(0,1)[0])
    current.moveDown()
  }
  boardHeight = board.reduce((acc,x)=>x.length>acc?x.length:acc, 0)
  console.log(board)
}

print()

function print() {
  for(let i = 0; i < boardHeight+3; i++) {
    console.log(board[i].join(''))
    // process.stdout.write()
  }
}