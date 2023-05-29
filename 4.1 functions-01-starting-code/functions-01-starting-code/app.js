const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_WINS = 'PLAYER WINS'
const RESULT_LOST = 'COMPUTER WINS'

let gameIsRunning = false



const getPlayerChoice = function(){
  const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();

  if(
    selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS
  ){
    alert(`Invalid choice! We chose ${DEFAULT_CHOICE} for you !`)
    // return DEFAULT_CHOICE
    return 
  }
  return selection;
}

const getComputerChoice = function() {
  const randomValue = Math.random();
  if (randomValue < .34) {
    return ROCK;
  } else if(randomValue < .67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

const getWinner = function(cChoice, pChoice = DEFAULT_CHOICE){
  if(cChoice === pChoice) {
    return RESULT_DRAW
  } else if (cChoice === ROCK && pChoice === PAPER || cChoice === PAPER && pChoice === SCISSORS || cChoice === SCISSORS && pChoice === ROCK ) {
    return RESULT_WINS
  } else {
    return RESULT_LOST
  }
}

startGameBtn.addEventListener('click', function(){
  if(gameIsRunning){
    return;
  }
  gameIsRunning = true;
  console.log('Game is Starting... ')
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if(playerChoice){
     winner = getWinner( computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice)
  }
  let message = `You picked ${playerChoice || DEFAULT_CHOICE}, compueter picked ${computerChoice}, there for you `
  if(winner === RESULT_DRAW){
    message = message + 'draw'
  }else if(winner === RESULT_WINS){
    message = message + 'won'
  }else{
    message = message + 'lost'
  }
  alert(message)
  gameIsRunning = false
})

// Not Related to Game 

const combine = (resultHandler, operation, ...numbers ) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number
  }
  let sum = 0
  if (operation === 'Add'){
    for ( const num of numbers ) {
      sum += validateNumber(num)
    }
  } else if (operation === 'Sub' ){
    for ( const num of numbers ) {
      sum -= num
    }
  }
  resultHandler(sum);
}
const showResult = (result, messageText ) => {
  alert( result  + ' ' + messageText)
}


combine(showResult.bind(this, 'The result after add all numbers '), 'Add', 1, 2, 3, 4, 5, 6);
combine(showResult.bind(this, 'The result after sub all numbers '), 'Sub', 1, 2, 3, 4, 5, 6);


