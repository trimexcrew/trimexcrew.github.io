
//---------------------------------------------------------------
$(document).ready(function(){
// $('.post-content img').each(function( index ) {
// $( this ).wrap("<a class=\"post-img\" href=\"" + $( this ).attr("src")+ "\" data-lightbox=\"img-set\" data-title=\""+ $( this ).attr("alt") +"\"></a>");
// });

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

    $('.ig_grid_line').children('.grid-post-content').css('display', 'none');
    $('.ig_grid_line').mouseenter( function(e) {
      $(this).children('.grid-post-content').css('display', 'flex');
    }).mouseleave(function(e) {
      $(this).children('.grid-post-content').css('display', 'none');
    });
});
//---------------------------------------------------------------
//---------------------------------------------------------------
