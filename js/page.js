$(document).ready(function(){
  $('#gatherings').timer();
  $('#global').pageNavigation();
  $('#news').slick({
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

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");

});
