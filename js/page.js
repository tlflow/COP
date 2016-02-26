$(document).ready(function(){
  $(document).foundation();
  $('#gatherings').timer();
  // $('#global').pageNavigation(); // doesnt do anything yet
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
