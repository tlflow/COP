$(document).ready(function(){
  $(document).foundation();
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
