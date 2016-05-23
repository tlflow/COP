$(document).ready(function(){
  $(document).foundation();
  $('#sunday-clock').timer();
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
