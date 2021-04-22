(function(){
   'use strict';

   const myForm = document.querySelector('#MyForm');
   const madLib = document.querySelector('#MadLib');
   const formData = document.querySelectorAll('#FormInputs input');

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

}());