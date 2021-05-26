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

   const cardIcons = [
      'Star.svg',
      'Circle.svg',
      'Triangle.svg',
      'Heart.svg',
      'Diamond.svg',
      'Club.svg',
      'Spade.svg'
   ];

   const players = {
      PLAYER: 'Player',
      DEALER: 'Dealer'
   }

   const handTypes = {
      FiveOfAKind: 6,
      FourOfAKind: 5,
      FullHouse: 4,
      ThreeOfAKind: 3,
      TwoPair: 2,
      OnePair: 1,
      None: 0
   }

   class Hand {
      constructor(cards) {
         this.cards = cards;
         this.counts = this.countCards();
         this.pairs = [];
         this.three = 0;
         this.four = 0;
         this.five = 0;
         this.type = this.determineType(this.counts);
      }

      // Count the number of cards for each value
      // Returns array of size 6
      countCards() {
         let counts = Array(6).fill(0);
         for (const card of this.cards) {
            counts[card - 1]++;
         }
         return counts;
      }

      // Determine Type AND populate other Hand properties
      determineType(counts) {
         const thisHand = this;
         counts.forEach(function (count, i) {
            const cardVal = i + 1;
            switch (count) {
            case 5:
               // Five of a Kind; we're done
               thisHand.five = cardVal;
               return handTypes.FiveOfAKind;
            case 4:
               // Four of a Kind; we're done
               thisHand.four = cardVal;
               return handTypes.FourOfAKind;
            case 3:
               // Three of a Kind (could still find a pair)
               thisHand.three = cardVal;
               if (thisHand.pairs.length === 1) {
                  // Full House; we're done
                  return handTypes.FullHouse;
               }
               break;
            case 2:
               // Pair (still could find another pair or 3oaK)
               thisHand.pairs.push(cardVal);
               if (thisHand.pairs.length === 2) {
                  // Two Pair; we're done
                  return handTypes.TwoPair;
               }
               else if (thisHand.three != 0) {
                  // Full House; we're done
                  return handTypes.FullHouse;
               }
               break;
            }
         });

         // Check for exactly one pair
         if (thisHand.length === 1) {
            return handTypes.OnePair;
         }

         return handTypes.None;
      }
   }

   let gameData = {
      // 0 for face-down, 1-6 for face-up
      cards: {
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
         const winner = pickWinner();
         // TODO: Payouts
      });

      // TODO: Betting Button Event Listeners
   }

   function dealCards() {
      // TODO: move these to a reset() function
      gameData.cards.player.splice(0);
      gameData.cardsSelected = Array(5).fill(false);
      gameData.numCardsSelected = 0;
      playerHand.innerHTML = ''
      dealerHand.innerHTML = ''

      // Randomly determine and construct cards
      for (let i = 0; i < 5; i++) {
         // Make dealer card
         const dealerCardVal = Math.floor(Math.random() * 6) + 1;
         gameData.cards.dealer.push(dealerCardVal);
         const dealerCard = document.createElement('div');
         dealerCard.className = `card c${i} faceDown`;
         dealerCard.innerHTML = `<img src="images/${cardIcons[0]}">`;
         dealerHand.appendChild(dealerCard);

         // Make player card
         const playerCardVal = Math.floor(Math.random() * 6) + 1;
         gameData.cards.player.push(playerCardVal);
         const playerCard = document.createElement('div');
         playerCard.className = `card c${i} selectable`;
         playerCard.innerHTML = `${playerCardVal}<img src="images/${cardIcons[playerCardVal]}">`;
         playerHand.appendChild(playerCard);

         // Add click listener to player card for selecting
         playerCard.addEventListener('click', toggleCardSelect);
      }

      console.log(gameData.cards);
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
            gameData.cards.player[i] = newVal;

            card.classList.remove('selected');
            card.innerHTML = `${newVal}<img src="images/${cardIcons[newVal]}">`;
         }
      }
   }

   function showHands() {
      for (let i = 0; i < 5; i++) {
         const dealerCard = dealerHand.children[i];
         const dealerCardVal = gameData.cards.dealer[i];
         dealerCard.classList.remove('faceDown');
         dealerCard.innerHTML = `${dealerCardVal}<img src="images/${cardIcons[dealerCardVal]}">`
      }
   }

   function pickWinner() {
      const hands = {
         player: new Hand(gameData.cards.player),
         dealer: new Hand(gameData.cards.dealer)
      }
      console.log(hands);

      if (hands.player.type > hands.dealer.type) {
         // player wins
      }
      else if (hands.player.type < hands.dealer.type) {
         // dealer wins
      }
      else {
         // same type
         // determine based on card values
      }
   }
})();