$(document).ready(function(){

  $(document).foundation();

  // Owl Carousel
  if ($('#page.about').length==1) {

    $('.owl-carousel').owlCarousel({
        margin:10,
        autoplay: true,
        nav: true,
        loop: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5

            }
        }
    });

  }

  // Instagram Feed

  if ($('#page.news').length==1) {

    var feed = new Instafeed({
      get: 'tagged',
      tagName: 'copcharlotte',
      clientId: '53e609419e13469981290aa020845345'
    });

    feed.run();

  }

  // Modals for Scripture verses
  COP.components.scriptures._init();


  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
