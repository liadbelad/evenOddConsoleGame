const args = process.argv.slice(2)

// console.log("myArgs: ", args[1])
const user1 = { name: args[0], score: 0 }
const user2 = { name: args[1], score: 0 }

let whoWin = undefined
let round = 1

while (!whoWin) {
  const randNum = Math.floor(Math.random() * (13 - -5 + 1)) + 1

  if (randNum % 2 === 0) {
    user1.score++
    console.log(
      `Round #${round}, random number is ${randNum}, ${user1.name} score`
    )
  } else {
    user2.score++
    console.log(
      `Round #${round}, random number is ${randNum}, ${user2.name} score`
    )
  }

  if (user1.score === 3) whoWin = user1.name
  else if (user2.score === 3) whoWin = user2.name

  console.log(
    `Status ${user1.name}: ${user1.score}, ${user2.name}: ${user2.score}`
  )

  round++
}

console.log(`${whoWin} Wins!`)
