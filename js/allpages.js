$(function() {

  // copyright
  $("#copyright").prepend("&copy;" + moment().format('YYYY')+ " ");

  //////////////////////////////////////////
  ///// global page scroll controllers  ////
  //////////////////////////////////////////

  $(window).on('scroll.pageScroll', _.debounce(function() {

  	var scrollPos, $_page;

  	$_page = $('#page');
  	scrollPos = document.body.scrollTop;

  	animateHeader._init( scrollPos );

  	if ( $_page.hasClass( 'home' )) {
  		// fadingMasthead._init();
  	}
  }, 300));



  /////////////////////////////////////////
  ///// global navigation controllers  ////
  /////////////////////////////////////////

  var navigationControl = {

  	clickEvents: function() {

  		var $_menubutton, $_menu, $_global, $_page;

  		$_menubutton = $('button.menu-icon');
  		$_page = $('#page');
  		$_menu = $('#menu');
  		$_global = $('#global');

  		$('body').on( 'click', $_menu, function( evt ){
  			evt.preventDefault();

  			$_global.toggleClass( 'active' );
  			$_page.toggleClass( 'no-scroll' );
  		} );

  		$('body').on( 'click', $_menubutton, function( evt ){
  			evt.preventDefault();

  			var self = $(this);
  			self.closest('.title-bar')
            .toggleClass('active');

  			$_global.toggleClass('show');
  		} );

  	},

  	_init: function() {
  		this.clickEvents();
  	}
  }

  navigationControl._init();


  /////////////////////////////////////////
  ///// global navigation controllers  ////
  /////////////////////////////////////////

  function showHeader() {

    var page = $('#page');

    if (page.hasClass('home')) {

      var $_global = $('#global'),
          scrollPos = document.body.scrollTop;

      if (scrollPos === 0) {
          $_global.removeClass("has-scrolled");
      } else {
          $_global.addClass("has-scrolled");
      }

    }
  }


  $(window).on('load', function() {
      if (Foundation.MediaQuery.current == 'small' || Foundation.MediaQuery.current == 'medium' || Foundation.MediaQuery.current == 'large' ) {
          controller.enabled(false);
      } else {
          controller.enabled(true);
          $(window).on('scroll', function() {
              showHeader();
              // fadingImage();
          });
      }
  });

  $(window).on('changed.zf.mediaquery', function(event, newSize, oldSize) {
      if (newSize == 'small' || newSize == 'medium') {
          controller.enabled(false);
      } else {
          controller.enabled(true);
          $(window).on('scroll', function() {
              showHeader();
              fadingImage();
          });
      }
  });

});
