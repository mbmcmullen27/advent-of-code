const md5 = require('md5')
const input = 'ugkcyxxp'
// const input = 'abc'
let index = 0
let hash, char, pos;
let password=Array(8).fill('_')
while(password.includes('_')) {
  hash = md5(input+index)
  pos = hash.charAt(5)
  char = hash.charAt(6)
  if (hash.match(/^0{5}.*/) && pos < 8 && password[pos] == '_'){
    console.log(`input: ${input}${index}`)
    console.log(hash)
    console.log(`input ${char} at ${pos}`)
    password[pos] = char
    console.log(`password: ${password.join('')  }\n`)
    found++
  }
  index++
}