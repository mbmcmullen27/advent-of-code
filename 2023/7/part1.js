const fs = require('fs');
const data = fs
  .readFileSync('./input', 'utf8')
  .split(/\n/)
  .map(line=>{
    return {
      cards: convertHand(line.split(/\s/)[0]),
      bid: parseInt(line.split(/\s/)[1])
    }
  })

function convertHand(hand) {
  return hand.split('').map(card=>{
    switch(card) {
      case 'A': return 14
      case 'K': return 13
      case 'Q': return 12
      case 'J': return 11
      case 'T': return 10
      default: return parseInt(card)
    }
  })
}

function secondOrdering(a, b) {
  for(let i=0; i<5; i++) {
    if(a.cards[i] > b.cards[i]) return 1
    else if(a.cards[i] < b.cards[i]) return -1
  }
  
  return 0
}

let result = data.map((hand, i)=> {
  let counts = Array(14).fill(0)
  for(card of hand.cards) counts[card-1]++

  hand.counts = counts
  hand.pairs = counts.filter(x=>x==2).length
  hand.triples = counts.filter(x=>x==3).length

  return hand
})

function checkHands(func, a, b) {
  if(func(a) && !func(b)) return 1
  if(!func(a) && func(b)) return -1
  if(func(a) && func(b)) return secondOrdering(a,b)
  return 0
}

result.sort((a, b) => {
  let fiveOfAKind = (hand) => hand.counts.includes(5),
      fourOfAKind = (hand) => hand.counts.includes(4),
      fullHouse = (hand) => hand.pairs == 1 && hand.triples == 1,
      threeOfAKind = (hand) => hand.counts.includes(3),
      twoPair = (hand) => hand.pairs == 2,
      onePair = (hand) => hand.pairs == 1, 
      test

  test = checkHands(fiveOfAKind, a, b)     
  if(test != 0) return test

  test = checkHands(fourOfAKind, a, b)     
  if(test != 0) return test
  
  test = checkHands(fullHouse, a, b)  
  if(test != 0) return test
  
  test = checkHands(threeOfAKind, a, b)
  if(test != 0) return test
  
  test = checkHands(twoPair, a, b)
  if(test != 0) return test
    
  test = checkHands(onePair, a, b)
  if(test != 0) return test
  
  return secondOrdering(a,b)
})

console.log(result.slice(100,200))
let total = result.map((hand, i) => hand.bid * (i+1))
  .reduce((sum, x)=> x+sum)

console.log(total)

// 252313216 low
// 252971426 high 
// 252770496
// 252715246