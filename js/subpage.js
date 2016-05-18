$(document).ready(function(){
  $(document).foundation();
  $('#global').pageNavigation(); // ALL PAGE NAVIGATION FUN
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
