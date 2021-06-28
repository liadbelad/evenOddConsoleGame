function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function get2RandomDifferentNumbers(min, max) {
  const num1 = randomInteger(min, max)
  let num2 = randomInteger(min, max)
  while (num1 === num2) {
    num2 = randomInteger(min, max)
  }
  return { num1, num2 }
}

function createNewUserObjectIfNeeded(users, num) {
  if (!users[num]) {
    users[num] = { name: args[num], score: 0 }
  }
}

function printCurrentRoundWinner(round, randNum, user) {
  console.log(
    `Round #${round}, random number is ${randNum}, ${user.name} score`
  )
}

function checkWinner(winScore, user1, user2) {
  if (user1.score === winScore) return user1
  else if (user2.score === winScore) return user2
}

const args = process.argv.slice(2)

if (args.length < 2 || args.length > 7) {
  throw new Error("2 - 7 num players is aloowed")
}

const users = {}
let tournamentWinner = undefined
let round = 1
const winScore = args.length > 5 ? Math.floor(args.length / 2) + 1 : 3

while (!tournamentWinner) {
  const { num1, num2 } = get2RandomDifferentNumbers(0, args.length - 1)

  createNewUserObjectIfNeeded(users, num1)
  createNewUserObjectIfNeeded(users, num2)

  const user1 = users[num1]
  const user2 = users[num2]

  const randNum = randomInteger(13, -5)

  if (randNum % 2 === 0) {
    user1.score++
    printCurrentRoundWinner(round, randNum, user1)
  } else {
    user2.score++
    printCurrentRoundWinner(round, randNum, user2)
  }

  const winner = checkWinner(winScore, user1, user2)
  if (winner) {
    tournamentWinner = winner
  }

  console.log(
    `Status ${user1.name}: ${user1.score}, ${user2.name}: ${user2.score}`
  )

  round++
}

console.log(`${tournamentWinner.name} Wins!`)
