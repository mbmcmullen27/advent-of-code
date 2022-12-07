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

let root = new dir("/", null),
    currentDir = root, 
    candidates = [],
    sum = 0, 
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

function calculate(tree) {
  if (tree.size <= 100000) sum += tree.size 
  tree.dirs.forEach(node=>calculate(node))
}

function find(tree) {
  if (tree.size > required) candidates.push(tree)
  tree.dirs.forEach(node=>find(node))
}

function size(tree) {
  tree.size = tree.files.reduce((total, e)=>total + e.size, 0)
  if (tree.dirs.length == 0) return tree.size
  tree.dirs.forEach(e=>tree.size += size(e))
  return tree.size
}

size(root)
available = 70000000 - root.size
required = 30000000 - available
console.log(available)
console.log(required)
find(root)
console.log(candidates.sort((a,b)=>a.size-b.size)[0])
