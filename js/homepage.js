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

});
