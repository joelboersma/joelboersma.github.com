(function(){
   'use strict';
   // console.log('reading js');

   console.log('descriptions:', descriptions);

   const heading = document.querySelector('main h2');
   const paragraph = document.querySelector('main p');
   const images = document.querySelectorAll('#pictures img');
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
            startScroll();
         }
         else if (event.deltaY < 0 && focusImg > 0) {
            // scrolling up
            console.log('scrolling up');

            focusImg--;
            startScroll();
         }
         else {
            console.log('out of bounds');
            scrollingNow = false;
         }
      }
   });

   function startScroll() {
      setScrollingTimeout();
      transitionImage();
      transitionText();
   }

   // Create timeout for 1 second before user can scroll again
   function setScrollingTimeout() {
      setTimeout(function() {
         scrollingNow = false;
         console.log('done!');
      }, 1000);
   }

   // Change which image is in focus
   function transitionImage() {
      console.log(focusImg);

      for (let i = 0; i < numImages; i++) {
         const thisImg = images[i];
         thisImg.className = '';

         if (i < focusImg) {
            thisImg.classList.add('above');
         }
         else if (i > focusImg) {
            thisImg.classList.add('below');
         }
         else {
            thisImg.classList.add('focus');
         }

         if (i > focusImg + 1 || i < focusImg - 1) {
            thisImg.classList.add('hidden');
         }
      }
   }

   function transitionText() {
      heading.classList.add('hidden');
      paragraph.classList.add('hidden');
      setTimeout(function() {
         const data = descriptions[focusImg];
         heading.innerHTML = data.date;
         paragraph.innerHTML = data.description;

         heading.classList.remove('hidden');
         paragraph.classList.remove('hidden');
      }, 500);
   }

   // init
   heading.innerHTML = descriptions[0].date;
   paragraph.innerHTML = descriptions[0].description;

}());