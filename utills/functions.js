const fs = require("fs")

const args = process.argv.slice(2)

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

function checkIfNegativeEven(num) {
  return num < 0 && num % 2 === 0
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

function printCurrentGameStatus(user1, user2) {
  console.log(
    `Status ${user1.name}: ${user1.score}, ${user2.name}: ${user2.score}`
  )
}

function checkWinner(winScore, user1, user2) {
  if (user1.score === winScore) return user1
  else if (user2.score === winScore) return user2
}

function appendDataToFile(path, player) {
  fs.appendFileSync(
    path,
    `Player ${player.name} Won in tourmanet at: ${new Date()} with a score of ${
      player.score
    }\n`
  )
}

module.exports = {
  appendDataToFile,
  checkWinner,
  printCurrentGameStatus,
  printCurrentRoundWinner,
  checkIfNegativeEven,
  createNewUserObjectIfNeeded,
  get2RandomDifferentNumbers,
  randomInteger,
  args,
}
