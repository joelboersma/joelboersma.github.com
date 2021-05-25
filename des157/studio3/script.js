(function(){
   'use strict';

   // Elements
   const header = document.querySelector('header');
   const startButton = document.getElementById('startGame');
   const gameControl = document.getElementById('gameControl');
   const cards = document.getElementById('cards');
   const gameStatus = document.getElementById('gameStatus');
   const scoreboards = document.getElementsByClassName('scoreboard');
   const actionArea = document.getElementById('actions');
   const rules = document.getElementById('rules');
   const quitButton = document.getElementById('quit');
   const helpButton = document.getElementById('help');
   const popup = document.getElementById('popup');
   const doneButton = document.querySelector('#popup section button');

   // Audio
   const beginSound = new Audio('media/begin.mp3');
   const cardDealSound = new Audio('media/cardDeal.mp3');
   const tadaSound = new Audio('media/tada.mp3');
   const buzzerSound = new Audio('media/fail-buzzer.mp3');
   const tromboneSound = new Audio('media/fail-trombone.mp3');
   beginSound.volume = 0.5;
   tadaSound.volume = 0.7;
   buzzerSound.volume = 0.3;

   let gameData = {
      dice: ['X.svg', 'Triangle.svg', 'Heart.svg', 'Diamond.svg', 'Club.svg', 'Spade.svg'],
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

      // Set up scoreboards
      for (let i = 0; i < scoreboards.length; i++) {
         const scoreboard = scoreboards[i];
         scoreboard.children[0].innerHTML = gameData.players[i];
         scoreboard.classList.remove('invisible');
      }

      // Reload when pushing quit button
      document.getElementById('quit').addEventListener('click', function() {
         location.reload();
      });

      beginSound.play();

      setUpTurn();
   });

   // Popup toggling
   helpButton.addEventListener('click', function() {
      popup.removeAttribute('hidden');
   });
   doneButton.addEventListener('click', function() {
      popup.setAttribute('hidden', 'hidden');
   });

   // Change the h2 on the main page depending on whose turn it is
   function changePlayerDisplay() {
      let pNum = gameData.index == 0 ? 'p1' : 'p2';
      gameControl.innerHTML = `<h2 class="${pNum}">${gameData.players[gameData.index]}'s Turn!</h2>`;
   }

   // Set up the turn
   function setUpTurn() {
      actionArea.innerHTML = '<button id="roll">Draw 2 Cards</button>';
      document.getElementById('roll').addEventListener('click', function() {
         throwDice();
      });
   }

   // Current player throws/draws the dice/cards
   function throwDice() {
      // Determine rolls
      gameData.roll1 = Math.floor(Math.random() * 6) + 1;
      gameData.roll2 = Math.floor(Math.random() * 6) + 1;
      gameData.rollSum = gameData.roll1 + gameData.roll2;
      
      actionArea.innerHTML = '';
      gameStatus.innerHTML = '';

      // Show dice/cards
      cards.innerHTML = `<div class="card">${gameData.roll1}
                           <img src="images/${gameData.dice[gameData.roll1-1]}">
                        </div>
                        <div class="card">${gameData.roll2}
                           <img src="images/${gameData.dice[gameData.roll2-1]}">
                        </div>`;

      // Based on roll...
      if (gameData.rollSum === 2) {
         // Snake Eyes
         tromboneSound.play();
         gameData.score[gameData.index] = 0;  // reset score
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);  // change player
         gameStatus.innerHTML = '<p>Oh no, Double Crossed! Score reset to 0...</p>';
         
         showCurrentScore();

         setTimeout(function() {
            changePlayerDisplay();
            setUpTurn();
         }, 3000);
      }
      else if (gameData.roll1 === 1 || gameData.roll2 === 1) {  
         // Rolled a 1
         buzzerSound.play();
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);  // change player
         gameStatus.innerHTML = `<p>Darn, you drew a 1. Switching to ${gameData.players[gameData.index]}...</p>`;

         setTimeout(function() {
            changePlayerDisplay();
            setUpTurn();
         }, 2000);
      }
      else {
         // Normal Roll
         gameData.score[gameData.index] += gameData.rollSum;  // add roll to score
         gameStatus.innerHTML = `<p>You drew ${gameData.rollSum} points!</p>`;
         actionArea.innerHTML = '<button id="rollAgain">Draw again</button> or <button id="pass">Pass</button>';

         // Roll Again button
         document.getElementById('rollAgain').addEventListener('click', function() {
            throwDice();
         });

         // Pass button
         document.getElementById('pass').addEventListener('click', function() {
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);  // change player
            changePlayerDisplay();
            setUpTurn();
         });

         checkWinningCondition();
      }
   }

   function checkWinningCondition() {
      showCurrentScore();
      if (gameData.score[gameData.index] >= gameData.gameEnd) {
         // Current player has won!
         tadaSound.play();
         let pNum = gameData.index == 0 ? 'p1' : 'p2';
         gameControl.innerHTML = `<h2 class="${pNum}">${gameData.players[gameData.index]} Wins!</h2>`;
         gameStatus.innerHTML = `<h3>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h3>`;
         actionArea.innerHTML = '<button id="restart">Start a New Game</button>';

         // Reload when pushing restart button
         document.getElementById('restart').addEventListener('click', function() {
            location.reload();
         });
      }
      else {
         cardDealSound.play();
      }
   }

   // Updates the scoreboards
   function showCurrentScore() {
      scoreboards[0].children[1].innerHTML = gameData.score[0];
      scoreboards[1].children[1].innerHTML = gameData.score[1];
   }

})();