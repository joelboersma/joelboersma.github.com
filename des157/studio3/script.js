(function(){
   'use strict';

   const header = document.querySelector('header');
   const startButton = document.getElementById('startGame');
   const gameControl = document.getElementById('gameControl');
   const game = document.getElementById('game');
   const dice = document.getElementById('dice');
   const gameStatus = document.getElementById('gameStatus');
   const scoreboards = document.getElementsByClassName('scoreboard');
   const actionArea = document.getElementById('actions');
   const rules = document.getElementById('rules');
   const quitButton = document.getElementById('quit');
   const helpButton = document.getElementById('help');

   let gameData = {
      dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
      players: ['Player 1', 'Player 2'],
      score: [0, 0],
      roll1: 0,
      roll2: 0,
      rollSum: 0,
      index: 0,  // current player
      gameEnd: 30  // min score to win
   };

   startButton.addEventListener('click', function() {
      header.removeAttribute('hidden');
      quitButton.removeAttribute('hidden');
      helpButton.removeAttribute('hidden');
      rules.setAttribute('hidden', 'hidden');

      gameData.index = Math.round(Math.random());
      changePlayerDisplay();

      // set up scoreboards
      for (let i = 0; i < scoreboards.length; i++) {
         const scoreboard = scoreboards[i];
         scoreboard.children[0].innerHTML = gameData.players[i];
         scoreboard.classList.remove('invisible');
      }

      document.getElementById('quit').addEventListener('click', function() {
         location.reload();
      });

      setUpTurn();
   });

   function changePlayerDisplay() {
      let pNum = gameData.index == 0 ? 'p1' : 'p2';
      gameControl.innerHTML = `<h2 class="${pNum}">${gameData.players[gameData.index]}'s Turn!</h2>`;
   }

   function setUpTurn() {
      // game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
      actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
      document.getElementById('roll').addEventListener('click', function() {
         throwDice();
      });
   }

   function throwDice() {
      actionArea.innerHTML = '';
      gameData.roll1 = Math.floor(Math.random() * 6) + 1;
      gameData.roll2 = Math.floor(Math.random() * 6) + 1;
      gameStatus.innerHTML = '';
      dice.innerHTML = `<img src="images/${gameData.dice[gameData.roll1-1]}">
                        <img src="images/${gameData.dice[gameData.roll2-1]}">`;
      gameData.rollSum = gameData.roll1 + gameData.roll2;

      if (gameData.rollSum === 2) {
         gameData.score[gameData.index] = 0;
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
         gameStatus.innerHTML = '<p>Oh snap! Snake eyes!</p>';
         
         showCurrentScore();

         setTimeout(function() {
            changePlayerDisplay();
            setUpTurn();
         }, 2000);
      }
      else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
         gameStatus.innerHTML = `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;

         setTimeout(function() {
            changePlayerDisplay();
            setUpTurn();
         }, 2000);
      }
      else {
         gameData.score[gameData.index] += gameData.rollSum;
         gameStatus.innerHTML = `<p>You rolled a ${gameData.rollSum}!</p>`;
         actionArea.innerHTML = '<button id="rollAgain">Roll again</button> or <button id="pass">Pass</button>';

         document.getElementById('rollAgain').addEventListener('click', function() {
            throwDice();
         });

         document.getElementById('pass').addEventListener('click', function() {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setUpTurn();
         });

         checkWinningCondition();

      }
   }

   function checkWinningCondition() {
      showCurrentScore();
      if (gameData.score[gameData.index] >= gameData.gameEnd) {
         let pNum = gameData.index == 0 ? 'p1' : 'p2';
         gameControl.innerHTML = `<h2 class="${pNum}">${gameData.players[gameData.index]} Wins!</h2>`;
         gameStatus.innerHTML = `<h3>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h3>`;
         console.log(`${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!`);
         actionArea.innerHTML = '<button id="restart">Start a New Game</button>';
         document.getElementById('restart').addEventListener('click', function() {
            location.reload();
         });
      }
   }

   function showCurrentScore() {
      scoreboards[0].children[1].innerHTML = gameData.score[0];
      scoreboards[1].children[1].innerHTML = gameData.score[1];
   }

})();