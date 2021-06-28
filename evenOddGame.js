const fs = require("fs")
const {
  get2RandomDifferentNumbers,
  createNewUserObjectIfNeeded,
  randomInteger,
  printCurrentRoundWinner,
  checkWinner,
  printCurrentGameStatus,
  appendDataToFile,
  checkIfNegativeEven,
  args,
} = require("./utills/functions")

const path = "./evenOddGameData.txt"

if (!fs.existsSync(path)) {
  fs.writeFileSync("./evenOddGameData.txt", "GAME RESULTS: \n")
}
fs.readFileSync(path, { encoding: "utf-8" })

if (args.length < 2 || args.length > 7) {
  throw new Error("2 - 7 num players is allowed")
}

const users = {}
let tournamentWinner = undefined
let round = 1
let winScore = args.length > 5 ? Math.floor(args.length / 2) + 1 : 3

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

  printCurrentGameStatus(user1, user2)

  round++
}

console.log(
  `${tournamentWinner.name} Wins in tourmomant!, moving to boss fight !`
)

appendDataToFile(path, tournamentWinner)

tournamentWinner.score = 0
const boss = { name: "boss", score: 0 }
round = 1
winScore = 3
let whoWinBossFight = undefined

while (!whoWinBossFight) {
  const randNum = randomInteger(13, -5)

  if (checkIfNegativeEven(randNum)) {
    console.log(`The number is ${randNum} - Boss special ability activated !`)
    continue
  }

  if (randNum % 2 === 0) {
    tournamentWinner.score++
    printCurrentRoundWinner(round, randNum, tournamentWinner)
  } else {
    boss.score++
    printCurrentRoundWinner(round, randNum, boss)
  }

  const winner = checkWinner(winScore, tournamentWinner, boss)
  if (winner) {
    whoWinBossFight = winner
  }

  printCurrentGameStatus(tournamentWinner, boss)

  round++
}

console.log(`${whoWinBossFight.name} Wins in boss fight!`)

appendDataToFile(path, whoWinBossFight)
