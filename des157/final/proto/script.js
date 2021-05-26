(function(){
   'use strict';

   // Elements
   const header = document.querySelector('header');
   const footer = document.querySelector('footer');
   const actionArea = document.getElementById('actions');
   const drawButton = document.getElementById('draw');
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

   const cardIcons = ['Star.svg', 'Circle.svg', 'Triangle.svg', 'Heart.svg', 'Diamond.svg', 'Club.svg', 'Spade.svg']

   let gameData = {
      // 0 for face-down, 1-6 for face-up
      
      hands: {
         player: [],
         dealer: []
      },
      numCardsSelected: 0,
      bank: 100,
      betAmount: 5
   };

   startButton.addEventListener('click', function() {
      // header.removeAttribute('hidden');
      quitButton.removeAttribute('hidden');
      helpButton.removeAttribute('hidden');
      rules.toggleAttribute('hidden');
      footer.toggleAttribute('hidden');

      // Reload when pushing quit button
      document.getElementById('quit').addEventListener('click', function() {
         location.reload();
      });

      // Popup toggling
      helpButton.addEventListener('click', function() {
         popup.removeAttribute('hidden');
      });
      doneButton.addEventListener('click', function() {
         popup.toggleAttribute('hidden');
      });

      beginSound.play();

      setUpRound();
   });

   // Set up the round
   function setUpRound() {
      dealCards();

      // Set up player actions
      actionArea.removeAttribute('hidden');
      // TODO: Betting Buttons

      // Player Drawing
      drawButton.addEventListener('click', function() {
         // Make all player cards unselectable
         for (const card of playerHand.children) {
            card.classList.remove('selectable');
            card.removeEventListener('click', toggleCardSelect);
         }

         actionArea.toggleAttribute('hidden');

         replacePlayerCards();

         // TODO: dealer drawing
         showHands();
         // determine winner
         // TODO: Payouts
      });

      // TODO: Betting Button Event Listeners
   }

   function dealCards() {
      // TODO: move these to a reset() function
      gameData.hands.player.splice(0);
      gameData.cardsSelected = Array(5).fill(false);
      gameData.numCardsSelected = 0;
      playerHand.innerHTML = ''
      dealerHand.innerHTML = ''

      // Randomly determine and construct cards
      for (let i = 0; i < 5; i++) {
         // Make dealer card
         const dealerCardVal = Math.floor(Math.random() * 6) + 1;
         gameData.hands.dealer.push(dealerCardVal);
         const dealerCard = document.createElement('div');
         dealerCard.className = `card c${i} faceDown`;
         dealerCard.innerHTML = `<img src="images/${cardIcons[0]}">`;
         dealerHand.appendChild(dealerCard);

         // Make player card
         const playerCardVal = Math.floor(Math.random() * 6) + 1;
         gameData.hands.player.push(playerCardVal);
         const playerCard = document.createElement('div');
         playerCard.className = `card c${i} selectable`;
         playerCard.innerHTML = `${playerCardVal}<img src="images/${cardIcons[playerCardVal]}">`;
         playerHand.appendChild(playerCard);

         // Add click listener to player card for selecting
         playerCard.addEventListener('click', toggleCardSelect);
      }

      console.log(gameData.hands);
   }

   function toggleCardSelect(event) {
      let playerCard = event.target;

      // fix image-clicking issue
      if (playerCard.parentElement.classList.contains('card')) {
         playerCard = playerCard.parentElement;
      }

      if (playerCard.classList.contains('selected')) {
         playerCard.classList.remove('selected');
         gameData.numCardsSelected--;
         if (gameData.numCardsSelected === 0) {
            drawButton.innerHTML = 'Hold';
         }
      }
      else {
         playerCard.classList.add('selected');
         if (gameData.numCardsSelected === 0) {
            drawButton.innerHTML = 'Draw';
         }
         gameData.numCardsSelected++;
      }
   }

   function replacePlayerCards() {
      const playerCards = playerHand.children;
      for (let i = 0; i < playerCards.length; i++) {
         const card = playerCards[i];
         if (card.classList.contains('selected')) {
            const newVal = Math.floor(Math.random() * 6) + 1;
            gameData.hands.player[i] = newVal;

            card.classList.remove('selected');
            card.innerHTML = `${newVal}<img src="images/${cardIcons[newVal]}">`;
         }
      }
   }

   function showHands() {
      for (let i = 0; i < 5; i++) {
         const dealerCard = dealerHand.children[i];
         const dealerCardVal = gameData.hands.dealer[i];
         dealerCard.classList.remove('faceDown');
         dealerCard.innerHTML = `${dealerCardVal}<img src="images/${cardIcons[dealerCardVal]}">`
      }
   }

})();