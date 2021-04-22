(function(){
   'use strict';

   // ***** FORMS *****

   const myForm = document.querySelector('#MyForm');
   const madLib = document.querySelector('#MadLib');
   const formData = document.querySelectorAll('section input');

   myForm.addEventListener('submit', function(event) {
      event.preventDefault();
      processFormData();
   });

   function processFormData() {
      let emptyFields = 0;
      const words = [];

      // get form values and clear inputs
      for (const field of formData) {
         if (field.value) {
            words.push(field.value);
            field.value = '';
         }
         else {
            emptyFields++;
         }
      }

      if (emptyFields > 0) {
         madLib.innerHTML = 'Please fill out every field.'
      }
      else {
         makeMadLib(words);
      }
      
      words.length = 0;
   }

   function makeMadLib(words) {
      let result = 'This is an example for the thing:'
      for(const word of words) {
         result += ` ${word}`;
      }
      madLib.innerHTML = result
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