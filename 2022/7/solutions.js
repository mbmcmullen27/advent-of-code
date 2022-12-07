const fs = require('fs');
const data = fs
    .readFileSync('./input', 'utf8')
    .split(/\n/)

class dir {
  constructor(name, parent) {
    this.name = name
    this.files = []
    this.dirs = []
    this.parent = parent
    this.size = 0
  }

  static calculate(tree) {
    if (tree.size <= 100000) sum += tree.size 
    tree.dirs.forEach(node=>dir.calculate(node))
  }

  static find(tree) {
    if (tree.size > required) candidates.push(tree)
    tree.dirs.forEach(node=>dir.find(node))
  }

  static getSize(tree) {
    tree.size = tree.files.reduce((total, e)=>total + e.size, 0)
    if (tree.dirs.length == 0) return tree.size
    tree.dirs.forEach(e=>tree.size += dir.getSize(e))
    return tree.size
  }

  addDir(dir) {
    this.dirs.push(dir)
  }

  addFile(name, size) {
    this.files.push({
      name: name,
      size: size
    })
  }
}

function part1(){
  dir.calculate(root)
  console.log(`sizes total: ${sum}`)
}

function part2(){
  available = 70000000 - root.size
  required = 30000000 - available
  console.log(`needs: ${required}`)
  dir.find(root)
  console.log(`best candidate: ${candidates.sort((a,b)=>a.size-b.size)[0].size}`)
}

var sum = 0;
let root = new dir("/", null),
    currentDir = root, 
    candidates = [],
    available, 
    required 

data.slice(1).forEach(ins => {
  let name, size;
  switch(true) {
    case /^\$ cd/.test(ins):
      name = ins.split(" ")[2]
      if (name == '..') currentDir = currentDir.parent
      else if (!currentDir.dirs.some(d=>d.name==name)) {
        let directory = new dir(name, currentDir) 
        currentDir.addDir(directory)
        currentDir = directory
      } else {
        currentDir = currentDir.dirs.find(d=>d.name==name)
      }
      break;
    case /^\$ ls/.test(ins):
      break;
    case /^dir/.test(ins):
      name = ins.split(" ")[1]
      if (!currentDir.dirs.some(d=>d.name==name)) {
        currentDir.addDir(new dir(name, currentDir))
      }
      break;
    case /^\d+ \w+/.test(ins):
      size = parseInt(ins.split(" ")[0])
      name = ins.split(" ")[1]
      if (!currentDir.files.some(file=>file.name == name)){
        currentDir.addFile(name, size)
      }
      break;
  }
})

dir.getSize(root), part1(), part2()