let intervalId= 0;

//JSON objects can't store functions
let score = JSON.parse(localStorage.getItem('score'))
  || {
    wins: 0,
    losses: 0,
    ties: 0
  };

//null values are also falsy values
/*if(!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}*/

document.querySelector('.js-reset-button')
  .addEventListener('click', () => resetGame());

document.querySelector('.js-auto-play')
  .addEventListener('click', () => autoPlay());

document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors'));

document.querySelector('body')
  .addEventListener('keydown', (event) => {
    console.log(event.key);
    if(event.key === 'r'){
      playGame('rock');
    }else if(event.key === 'p'){
      playGame('paper');
    }else if(event.key === 's'){
      playGame('scissors'); 
    }else if(event.key === 'a'){
      autoPlay();
    }else if(event.key === 'Backspace'){
      resetGame();
    }
  })

updateScore();

function autoPlay(){
  //isAutoPlaying = false;
  
  /*if(!isAutoPlaying){
    intervalId = setInterval(function(){
      playGame(generateComputerMove());
    }, 1000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }*/

  //alternative solution
  let autoplayButtonElem = document.querySelector('.js-auto-play');
  let isAutoPlaying = autoplayButtonElem.classList.contains('stop-play');

  if(!isAutoPlaying){
    intervalId = setInterval(function(){
      playGame(generateComputerMove());
    }, 1000);
    autoplayButtonElem.innerHTML = 'Stop play';
    autoplayButtonElem.classList.add('stop-play');
  }else{
    clearInterval(intervalId);
    autoplayButtonElem.innerHTML = 'Auto play';
    autoplayButtonElem.classList.remove('stop-play');
  }
}

function playGame(userMove){

  console.log(userMove);

  let result = '';

  const computerMove = generateComputerMove();

  // function stop after returning a value
  // return computerMove;
  if(userMove === computerMove){
    result = 'You tie.';
  } else if(userMove === 'scissors'){
    if(computerMove === 'rock' ){
      result = 'You lose.';
    } else if(computerMove === 'paper'){
      result = 'You won. Congrats!';
    }
  } else if(userMove === 'paper'){
    if(computerMove === 'rock' ){
      result = 'You won. Congrats!';
    } else if(computerMove === 'scissors'){
      result = 'You lose.';
    }
  } else if(userMove === 'rock'){
    if(computerMove === 'paper'){
      result = 'You lose.';
    } else if(computerMove === 'scissors'){
      result = 'You won. Congrats!';
    }
  }

  if(result === 'You won. Congrats!'){
    score.wins++;
  }else if(result === 'You lose.'){
    score.losses++;
  }else if(result === 'You tie.'){
    score.ties++;
  }

  document.querySelector('.js-results')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="resources/${userMove}-emoji.png" class="move-icon">
        <img src="resources/${computerMove}-emoji.png" class="move-icon"> Computer `;

  updateScore();

  //localStorage can only store strings
  //JSON.stringify helps to make the objects into strings
  //JSON.parse helps to convert string values in localStorage into objects 
  localStorage.setItem('score', JSON.stringify(score));
}

function resetGame(){
  score.losses = 0;
  score.wins = 0;
  score.ties = 0;
  localStorage.removeItem(localStorage.removeItem('score'));
  updateScore();
}

function generateComputerMove(){

  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3 ){
    computerMove = 'rock';
  }else if(randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  }else if(randomNumber >= 2/3 && randomNumber <=1){
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScore(){
  document.querySelector('.js-score')
  .innerHTML = `wins: ${score.wins}, losses: ${score.losses},ties: ${score.ties}`;
}
