(function(){
   'use strict';
   // console.log('reading js');

   const numImages = 6;
   let focusImg = 0;
   let scrollingNow = false;

   // Listen for mouse wheel
   window.addEventListener('wheel', function(event) {

      if (!scrollingNow) {
         scrollingNow = true;

         // Which direction is the scroll?
         if (event.deltaY > 0 && focusImg < numImages - 1) {
            // scrolling down
            console.log('scrolling down');

            focusImg++;
            setScrollingTimeout();
            transitionImage();
         }
         else if (event.deltaY < 0 && focusImg > 0) {
            // scrolling up
            console.log('scrolling up');

            focusImg--;
            setScrollingTimeout();
            transitionImage();
         }
         else {
            console.log('out of bounds');
            scrollingNow = false;
         }
      }
   });

   function setScrollingTimeout() {
      setTimeout(function() {
         scrollingNow = false;
         console.log('done!');
      }, 1000);
   }

   function transitionImage() {
      console.log(focusImg);
   }

}());