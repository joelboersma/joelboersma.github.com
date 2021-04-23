(function(){
   'use strict';

   // ***** FORMS *****

   const myForm = document.querySelector('#MyForm');
   const madLib = document.querySelector('#MadLib');
   const formError = document.querySelector('#formError');
   const formSection = document.querySelector('#formSection');
   const formButton = document.querySelector('input[type="submit"]');
   const h2 = document.querySelector('h2');

   const formData = document.querySelectorAll('section input');
   const mlEmTags = document.querySelectorAll('article em');

   let madLibShowing = false;

   myForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (madLibShowing) {
         showForm();
         // madLibShowing = false;
      }
      else {
         processFormData();
      }
   });

   function processFormData() {
      const words = [];

      // get form values and clear inputs
      for (const field of formData) {
         if (field.value) {
            words.push(field.value);
         }
         else {
            break;
         }
      }

      // if not every field is filled out
      if (words.length < formData.length) {
         formError.innerHTML = 'Error: Please fill out every field.'
         formError.className = 'showing';
      }
      else {
         for (const field of formData) {
            field.value = '';
         }
         formError.className = '';
         showMadLib(words);
      }
   }

   function showMadLib(words) {
      // Example code for showing results
      mlEmTags[0].innerHTML = words[0];
      mlEmTags[1].innerHTML = words[1];
      mlEmTags[2].innerHTML = words[0];
      mlEmTags[3].innerHTML = words[2];
      mlEmTags[4].innerHTML = words[3];
      mlEmTags[5].innerHTML = words[4];

      formSection.setAttribute('hidden', 'hidden');
      madLib.removeAttribute('hidden')
      formButton.setAttribute('value', 'Create Another Adventure');
      formButton.classList = 'restartButton';
      h2.innerHTML = 'Your Adventure';
      madLibShowing = true;
   }

   function showForm() {
      formSection.removeAttribute('hidden');
      madLib.setAttribute('hidden', 'hidden');
      formButton.setAttribute('value', 'Blast Off');
      formButton.classList = '';
      h2.innerHTML = 'Complete the word list below...';
      madLibShowing = false;
   }


   // ***** STARS *****

   const SpaceBG = document.querySelector('#SpaceBG');

   // n: int
   // Place @n stars
   function placeStars(n) {
      for (let i = 0; i < n; i++) {
         const bottom = Math.random() * 100;
         const right = Math.random() * 100;
         const size = Math.floor(Math.random() * 3 + 1);

         let star = document.createElement('div');
         star.className = 'star';
         star.style.bottom = bottom + '%';
         star.style.right = right + '%';
         star.style.width = size + 'px';
         star.style.height = size + 'px';
         
         SpaceBG.appendChild(star);
      }
   }

   placeStars(100);

}());