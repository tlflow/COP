$(document).ready(function(){
  $(document).foundation();
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  if ($('#page.about').length==1) {

    $('.owl-carousel').owlCarousel({
        margin:10,
        autoplay: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5,
                nav: true,
                loop: true
            }
        }
    });

  }

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
