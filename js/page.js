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

    var sectiontitle = $(this).data( 'subtitle' ),
        offset = 60;

    // show section
    $('#'+sectiontitle).toggleClass( 'active' );

    // scroll to section automatically
    function scrolltoSubsection(){
      $('body').animate({
          scrollTop: $('#'+sectiontitle).offset().top - offset
      }, 800);
    }
    setTimeout(function(){ scrolltoSubsection() }, 1000);

    // close button
    $('body').on('click', '.sub-section.active .close', function(){
        $(this).closest('.sub-section').removeClass( 'active' );
        $('body').animate({
          scrollTop: $('#about').offset().top
        }, 600);
    });
  });

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");

  enquire.register("screen and (max-width:45em)", {
    match : function() {
      console.log('dancing dan');
    },
    unmatch: function() {
      console.log('nope');
    }
  });

});
