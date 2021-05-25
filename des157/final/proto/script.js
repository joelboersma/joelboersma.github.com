(function(){
   'use strict';

   // Elements
   const header = document.querySelector('header');
   const footer = document.querySelector('footer');
   const actionArea = document.getElementById('actions');
   const rules = document.getElementById('rules');
   const startButton = document.getElementById('startGame');
   const quitButton = document.getElementById('quit');
   const helpButton = document.getElementById('help');
   const popup = document.getElementById('popup');
   const doneButton = document.querySelector('#popup section button');
   const playerHand = document.getElementById('player');
   const dealerHand = document.getElementById('dealer');

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
      // 0 for face-down, 1-6 for face-up
      cardIcons: ['Star.svg', 'Circle.svg', 'Triangle.svg', 'Heart.svg', 'Diamond.svg', 'Club.svg', 'Spade.svg'],
      hands: {
         player: [],
         dealer: []
      },
      bank: 100,
      betAmount: 5
   };

   startButton.addEventListener('click', function() {
      // header.removeAttribute('hidden');
      quitButton.removeAttribute('hidden');
      helpButton.removeAttribute('hidden');
      rules.setAttribute('hidden', 'hidden');
      footer.setAttribute('hidden', 'hidden');

      // Reload when pushing quit button
      document.getElementById('quit').addEventListener('click', function() {
         location.reload();
      });

      // Popup toggling
      helpButton.addEventListener('click', function() {
         popup.removeAttribute('hidden');
      });
      doneButton.addEventListener('click', function() {
         popup.setAttribute('hidden', 'hidden');
      });

      beginSound.play();

      setUpRound();
   });

   // Set up the round
   function setUpRound() {
      dealCards();

      // set up player actions
      // player actions (drawing, betting [later])
      // dealer drawing
      // show hands
      // determine winner
      // payouts [later]
   }

   function dealCards() {
      // Randomly determine cards
      gameData.hands.player.splice(0);
      playerHand.innerHTML = ''
      dealerHand.innerHTML = ''
      for (let i = 0; i < 5; i++) {
         const playerCard = Math.floor(Math.random() * 6) + 1;
         gameData.hands.player.push(playerCard);
         playerHand.innerHTML += `<div class="card c${i}">${gameData.hands.player[i]}<img src="images/${gameData.cardIcons[playerCard]}"></div>`;

         const dealerCard = Math.floor(Math.random() * 6) + 1;
         gameData.hands.dealer.push(dealerCard);
         dealerHand.innerHTML += `<div class="card c${i}">${gameData.hands.dealer[i]}<img src="images/${gameData.cardIcons[dealerCard]}"></div>`;
      }

      for (const card of playerHand.children) {
         card.addEventListener('click', () => {
            if (card.classList.contains('selected')) {
               card.classList.remove('selected');
            }
            else {
               card.classList.add('selected');
            }
         });
      }
   }

})();