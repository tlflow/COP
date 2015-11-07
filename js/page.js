$(document).ready(function(){
  $('#gatherings').timer();
  $('#slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    cssEase: 'linear'
  });

  // vision, purpose and belief buttons

  $('body').on('click', '#about button', function(evt){
    evt.preventDefault();

    var sectiontitle = $(this).data( 'subtitle' );
    $('#'+sectiontitle).toggleClass( 'active' );
  });

  // menu navigation

  $( 'body').on( 'click', '#menu', function(evt){
    evt.preventDefault();

    var menubutton = $(this),
        menuscreen = $('#global');

    menuscreen.toggleClass('active');    
  })
});
