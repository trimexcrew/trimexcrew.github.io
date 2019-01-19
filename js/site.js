
//---------------------------------------------------------------
$(document).ready(function(){
    lightbox.option({
      'resizeDuration': 200,
      'fadeDuration': 300,
      'wrapAround': true
    });
    AOS.init();


    $('.mas_abajo').on('click', function(e) {
      $('html, body').animate({
        scrollTop: $("#ig").offset().top
      }, 800);
    });
});
//---------------------------------------------------------------
//---------------------------------------------------------------
