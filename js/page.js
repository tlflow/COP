$(document).ready(function(){
  $(document).foundation();
  // $('#gatherings').timer();
  // $('#global').pageNavigation(); // doesnt do anything yet
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  var clock;

      var nextSunday = moment().day(7).format("MMMM D, YYYY 11:00:00");

      // Grab the current date
      var currentDate = new Date();

      // Set future date for next Sunday
      var futureDate = new Date(nextSunday);

      // Calculate the difference in seconds between the future date and current date
      var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

      // Instantiate a coutdown FlipClock
      clock = $('#sunday-clock').FlipClock(diff, {
        clockFace: 'DailyCounter',
        countdown: true,
        showSeconds: false
      });  


  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");
});
