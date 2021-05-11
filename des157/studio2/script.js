(function(){
   'use strict';

   console.log('descriptions:', descriptions);

   const heading = document.querySelector('main h2');
   const paragraph = document.querySelector('main p');
   const dots = document.querySelectorAll('.dot');
   const images = document.querySelectorAll('#pictures img');
   const numImages = 6;
   const transitionLength = 1000;
   let focusImg = 0;
   let scrollingNow = false;

   // Listen for mouse wheel
   window.addEventListener('wheel', function(event) {

      if (!scrollingNow) {
         scrollingNow = true;

         // Which direction is the scroll?
         if (event.deltaY > 0 && focusImg < numImages - 1) {
            // scrolling down
            focusImg++;
            startScroll();
         }
         else if (event.deltaY < 0 && focusImg > 0) {
            // scrolling up
            focusImg--;
            startScroll();
         }
         else {
            scrollingNow = false;
         }
      }
   });

   function startScroll() {
      setScrollingTimeout();
      transitionImage();
      transitionText();
      transitionDots();
   }

   // Create timeout for 1 second before user can scroll again
   function setScrollingTimeout() {
      setTimeout(function() {
         scrollingNow = false;
      }, transitionLength);
   }

   // Change which image is in focus
   function transitionImage() {
      console.log(focusImg);

      images.forEach(function(img, i) {
         img.className = '';

         if (i < focusImg) {
            img.classList.add('above');
         }
         else if (i > focusImg) {
            img.classList.add('below');
         }
         else {
            img.classList.add('focus');
         }

         if (i > focusImg + 1 || i < focusImg - 1) {
            img.classList.add('hidden');
         }
      });
   }

   // Hide text, then change text, then show text
   function transitionText() {

      // hide
      heading.classList.add('hidden');
      paragraph.classList.add('hidden');

      setTimeout(function() {
         // change text to description corresponding to focused image
         const data = descriptions[focusImg];
         heading.innerHTML = data.date;
         paragraph.innerHTML = data.description;

         // show
         heading.classList.remove('hidden');
         paragraph.classList.remove('hidden');
      }, transitionLength / 2);
   }

   // Focus the dot corresponding to the focused image
   function transitionDots() {
      dots.forEach(function(dot, i) {
         if (i == focusImg) {
            dot.classList.add('focus');
         }
         else {
            dot.classList.remove('focus');
         }
      });
   }

   // init
   heading.innerHTML = descriptions[0].date;
   paragraph.innerHTML = descriptions[0].description;

}());