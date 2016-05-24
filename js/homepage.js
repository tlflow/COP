$(function(){
  $(document).foundation();
  $('#sunday-clock').timer();
  // $(".owl-carousel").owlCarousel(); // uncomment for carousel eventually

  //////////////////////////////////////////
  /// fading masthead layer on homepage ////
  //////////////////////////////////////////

  var fadingMasthead = {

  	fadeLayer: function() {
  		var $_topImage, fadeStart, fadeUntil, opacity;

  		$_topImage  = $('.image-1'),
  		fadeStart = $_topImage.offset().top,
  		fadeUntil = $_topImage.height();
  		opacity = 0;

  		if ( scrollPos<=fadeStart ) {
  			opacity = 1;
  		} else if( scrollPos<=fadeUntil ) {
  			opacity = 1-scrollPos/fadeUntil;
  		}

  		$_topImage.css('opacity', opacity);

  	},

  	_init: function( scrollPos ) {
  		this.fadeLayer( scrollPos );
  	}
  };

  //////////////////////////////////
  /// homepage parallax controls ///
  //////////////////////////////////

  var parallaxScrolling = {

  	setup: function() {

  		var controller = new ScrollMagic.Controller({
          globalSceneOptions: {
              triggerHook: "onEnter",
              duration: "200%"
          }
      });

      $('.parallax__parent').each(function() {
          var name = $(this).attr('id');

          new ScrollMagic.Scene({
                  triggerElement: this
              })
              .setTween("#" + name + " > div", {
                  y: "80%",
                  ease: Linear.easeNone
              })
              // .addIndicators() // only for debug purposes
              .addTo(controller);
      });

  	},

  	_init: function() {
  		this.setup();
  	}

  }

  parallaxScrolling._init();
});
