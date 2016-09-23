

$(function() {

  $.cloudinary.config({ cloud_name: 'church-of-philadelphia', api_key: '952514468874921'});

  $.cloudinary.responsive({
    type : 'fetch',
	  responsive_use_stoppoints : true
  });

  $(".cover-img").load(function(){
    var self = $(this);
    var picLink = self.attr('src');

    setTimeout(function(){
        self.closest('.pic').css('backgroundImage', 'url('+picLink+')');
    }, 2);
  });

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");

  //////////////////////////////////////////
  ///// global page scroll controllers  ////
  //////////////////////////////////////////

  var scrollPos, $_page;

  $_page = $('#page');

  $(window).on('scroll.pageScroll_1ms', _.debounce(function() {

    scrollPos = document.body.scrollTop;

    animateHeader._init( scrollPos );
    // console.log(scrollPos);

  }, 100));


  // $(window).on('scroll.pageScroll_3ms', _.debounce(function() {
  //
  // 	if ( $_page.hasClass( 'home' )) {
  // 		// fadingMasthead._init();
  // 	}
  // }, 300));

  // use cloudinary built in responsive engine
  $.cloudinary.responsive();


  /////////////////////////////
  /// cue header animation ////
  /////////////////////////////

  var animateHeader = {

    resize: function( scrollPos ) {
      var $_global, $_regional;

      $_global = $('#global');
      $_regional = $('#regional');

      if (scrollPos === 0) {
        $_global.removeClass("has-scrolled");
        $_regional.removeClass("has-scrolled");
      } else {
        $_global.addClass("has-scrolled");
        $_regional.addClass("has-scrolled");
      }
    },

    _init: function( scrollPos ) {
      this.resize( scrollPos );
    }
  };

  /////////////////////////////////////////
  ///// global navigation controllers  ////
  /////////////////////////////////////////

  var navigationControl = {

  	clickEvents: function($_page) {

  		var $_menubutton, $_global, $_titlebar;

      $_titlebar = $('.title-bar');
  		$_global = $('#global');

  		$('body').on( 'click.menubutton', 'button.menu-icon', function( evt ){
  			evt.preventDefault();

  			$_global.toggleClass( 'active' );
  			$_page.toggleClass( 'no-scroll' );
        $_titlebar.toggleClass('active');
  		} );

  	},

  	_init: function() {
  		this.clickEvents($_page);
  	}
  }

  navigationControl._init($_page);



  /////////////////////////////////////
  ///// per media query settings   ////
  /////////////////////////////////////

  if ($_page.hasClass('home')) {

    //////////////////////////
    ///  parallax controls ///
    //////////////////////////


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

    if (Foundation.MediaQuery.current == 'small' || Foundation.MediaQuery.current == 'medium' || Foundation.MediaQuery.current == 'large' ) {
      controller.enabled(false);
    } else {
      controller.enabled(true);
    }

    $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
      if (newSize == 'small' || newSize == 'medium') {
          controller.enabled(false);
      } else {
          controller.enabled(true);
      }
    });

  }

  // start carousel if on page
  $('.owl-carousel').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
  });

});
