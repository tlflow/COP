$(document).ready(function(){
  $(document).foundation();
  $('#sunday-clock').timer();
  $('#global').pageNavigation(); // ALL PAGE NAVIGATION FUN
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually




  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
