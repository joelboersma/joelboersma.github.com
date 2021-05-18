(function(){
   'use strict';

   const startGame = document.getElementById('startgame');
   const gameControl = document.getElementById('gamecontrol');
   const game = document.getElementById('game');
   const scoreboards = document.getElementsByClassName('scoreboard');
   const actionArea = document.getElementById('actions');

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

   startGame.addEventListener('click', function() {
      gameData.index = Math.round(Math.random());
      gameControl.innerHTML = '<h2>The Game Has Started</h2>';
      gameControl.innerHTML += '<button id="quit">Wanna Quit?</button>';

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

   function setUpTurn() {
      game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
      actionArea.innerHTML = '<button id="roll">Roll the Dice</button>';
      document.getElementById('roll').addEventListener('click', function() {
         throwDice();
      });
   }

   function throwDice() {
      actionArea.innerHTML = '';
      gameData.roll1 = Math.floor(Math.random() * 6) + 1;
      gameData.roll2 = Math.floor(Math.random() * 6) + 1;
      game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
      game.innerHTML += `<img src="images/${gameData.dice[gameData.roll1-1]}">
                         <img src="images/${gameData.dice[gameData.roll2-1]}">`;
      gameData.rollSum = gameData.roll1 + gameData.roll2;

      if (gameData.rollSum === 2) {
         gameData.score[gameData.index] = 0;
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
         game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
         
         showCurrentScore();

         setTimeout(setUpTurn, 200);
      }
      else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
         gameData.index ? (gameData.index = 0) : (gameData.index = 1);
         game.innerHTML += `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;

         setTimeout(setUpTurn, 2000);
      }
      else {
         gameData.score[gameData.index] += gameData.rollSum;
         actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

         document.getElementById('rollagain').addEventListener('click', function() {
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
         // score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
         console.log(`${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!`);
         actionArea.innerHTML = '';
         document.getElementById('quit').innerHTML = 'Start a New Game';
      }
   }

   function showCurrentScore() {
      scoreboards[0].children[1].innerHTML = gameData.score[0];
      scoreboards[1].children[1].innerHTML = gameData.score[1];
   }

})();