////////////////////
// google map api //
////////////////////

  if (typeof google=="undefined") {

    console.log("no googs homes");

  } else {

    var mapLocation = new google.	maps.LatLng(35.298925, -80.774675),
    church = new google.maps.LatLng(35.298925, -80.774675),
    marker = [],
    // image = 'images/cop-logo.40x85.png',
    map;

    function initialize() {
      var mapOptions = {
        zoom: 13,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        center: mapLocation
      };

      map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    }

    function toggleBounce() {

      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    //show marker

    function showMarker() {
      var myWindow 	  	 = $(window),
        mapLocation   	 = $("#map-canvas").offset().top,
        browserHeight 	 = myWindow.height(),
        eyeLevel 	  	 = Math.floor(browserHeight * -0.5),
        windowComparison = myWindow.scrollTop() - mapLocation;

      if (windowComparison >= eyeLevel) {

        marker = new google.maps.Marker({
            map:map,
            draggable:true,
            // icon: image,
            animation: google.maps.Animation.DROP,
            position: church
        });

        // bounce if somebody clicks it
        google.maps.event.addListener(marker, 'click', toggleBounce);

        // stop tracking scroller for maps
        myWindow.unbind('scroll.triggerMarker');
      }
    }

    $(window).on('load.triggerMarker', _.debounce( showMarker, 10 ));
    // initialize()

  }

  // init
  google.maps.event.addDomListener(window, 'load', initialize);

  /////////////////////////////////
  // remove words about location //
  /////////////////////////////////

  $('#map-canvas').on('click', function(){
    var blurb = $('.location-blurb');
    blurb.fadeOut();
  });
