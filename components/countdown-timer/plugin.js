$.widget( "COP.timer", {

  _create: function() {
    // // get next Sunday
    // var nextSunday = moment().day(7).format("YYYY-MM-DDT11:00:00Z");
    //
    // // make it a moment object again
    // var event = moment(nextSunday);
    //
    // // get current time/date
    // var current = moment();
    //
    // // get difference between event and current
    // var diffTime = event.diff(current);
    //
    // // let moment.js make the duration out of the timestamp
    // var duration = moment.duration(diffTime, 'milliseconds', true);
    //
    // // set interval of timer to milliseconds
    // var interval = 1000;
    //
    // var clock = $('#clock');
    //
    // setInterval(function(){
    //   duration = moment.duration(duration - interval, 'milliseconds');
    //   clock.html(
    //       "<div class=\'days cell\'>"+duration.days()+"<span>days</span></div>" +
    //       "<div class=\'hours cell\'>"+duration.hours()+"<span>hours</span></div>" +
    //       "<div class=\'mins cell\'>"+duration.minutes()+"<span>mins</span></div>" +
    //       "<div class=\'secs cell\'>"+duration.seconds()+"<span>secs</span></div>")
    // }, interval);
    //
    // clock.fadeIn();

    var clock, nextSunday, currentDate, futureDate, diff;

    nextSunday = moment().day(7).format("MMMM D, YYYY 11:00:00");

    // Grab the current date
    currentDate = new Date();

    // Set future date for next Sunday
    futureDate = new Date(nextSunday);

    // Calculate the difference in seconds between the future date and current date
    diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock = $('#sunday-clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true,
      showSeconds: false
    });
  }
});
