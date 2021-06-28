function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function printCurrentRoundWinner(round, randNum, user) {
  console.log(
    `Round #${round}, random number is ${randNum}, ${user.name} score`
  )
}

const args = process.argv.slice(2)

const user1 = { name: args[0], score: 0 }
const user2 = { name: args[1], score: 0 }

let whoWin = undefined
let round = 1

while (!whoWin) {
  const randNum = randomInteger(13, -5)

  if (randNum % 2 === 0) {
    user1.score++
    printCurrentRoundWinner(round, randNum, user1)
  } else {
    user2.score++
    printCurrentRoundWinner(round, randNum, user2)
  }

  if (user1.score === 3) whoWin = user1.name
  else if (user2.score === 3) whoWin = user2.name

  console.log(
    `Status ${user1.name}: ${user1.score}, ${user2.name}: ${user2.score}`
  )

  round++
}

console.log(`${whoWin} Wins!`)
