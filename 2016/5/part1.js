const md5 = require('md5')
const input = 'ugkcyxxp'
// const input = 'abc'
let index = 0
let hash;
let password=''
while(password.length<8) {
  hash = md5(input+index)
  if (hash.match(/^0{5}.*/)){
    console.log(`input: ${input}${index}`)
    console.log(hash)
    password+=hash.charAt(5)
  }
  index++
}
console.log(`password: ${password}`)