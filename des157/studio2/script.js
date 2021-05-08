(function(){
   'use strict';

   let scrollingNow = false;

   // Listen for mouse wheel
   window.addEventListener('wheel', function(event) {

      if (!scrollingNow) {
         scrollingNow = true;

         // Which direction is the scroll?
         if (event.deltaY > 0) {
            // scrolling down
            console.log('scrolling down');
         }
         else if (event.deltaY < 0) {
            // scrolling up
            console.log('scrolling up');
         }
         else {
            // scrolling 0 (shouldn't happen)
            console.log('scrolling 0');
         }

         setTimeout(function() {
            scrollingNow = false;
            console.log('done!');
         }, 2000);
      }

   });

}());