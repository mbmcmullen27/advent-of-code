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
      case 'A': return 12
      case 'K': return 11
      case 'Q': return 10
      case 'J': return 0
      case 'T': return 9
      default: return parseInt(card) - 1
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
  for(card of hand.cards) counts[card]++

  hand.counts = counts
  hand.pairs = counts.slice(1).filter(x=>x==2).length
  hand.triples = counts.slice(1).filter(x=>x==3).length
  hand.jokers = counts[0]

  return hand
})

function checkHands(func, a, b) {
  if(func(a) && !func(b)) return 1
  if(!func(a) && func(b)) return -1
  if(func(a) && func(b)) return secondOrdering(a,b)
  return 0
}

result.sort((a, b) => {
  let types = [
    fiveOfAKind = (hand) => hand.counts.slice(1)
      .reduce((high, x) => x>high? x : high, 0) + hand.jokers == 5, 

    fiveOfAKind = (hand) => hand.counts.slice(1)
      .reduce((high, x) => x>high? x : high) + hand.jokers == 4, 

    fullHouse = (hand) => (hand.pairs == 1 && hand.triples == 1) 
      || (hand.pairs == 2 && hand.jokers == 1)
      || (hand.pairs == 1 && hand.jokers == 2),

    threeOfAKind = (hand) => hand.triples == 1 
      || (hand.pairs == 1 && hand.jokers == 1)
      || (hand.pairs == 0 && hand.jokers == 2),

    twoPair = (hand) => hand.pairs == 2 
      || (hand.pairs == 1 && hand.jokers == 1),

    onePair = (hand) => hand.pairs == 1 || hand.jokers == 1
  ], test

  for(type of types) {
    test = checkHands(type, a, b)     
    if(test != 0) return test
  }
  
  return secondOrdering(a,b)
})

console.log(result.slice(0,20))
let total = result.map((hand, i) => hand.bid * (i+1))
  .reduce((sum, x)=> x+sum)

console.log(total)

// 254461045 high
// 253553446 high
// 253499763