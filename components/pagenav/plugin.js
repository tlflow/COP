$.widget( "COP.pageNavigation", {

  _create: function() {

    var page = $('#page');

    // links
    // $( 'body').on( 'click', '#global a', function(evt){
    //   evt.preventDefault();
    //
    //   var navitem = $(this).data( 'link' );
    //   alert(navitem);
    // });

    //////////// toggle menu button  //////////////////
    $( 'body').on( 'click', '#menu', function(evt){
      evt.preventDefault();

      var menubutton = $(this),
          menuscreen = $('#global');

      menuscreen.toggleClass('active');
      page.toggleClass('no-scroll');
    });

    //////////// code for clear or solid header  //////////////////
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

    //////////// code for fading masthead image //////////////////
    function fadingImage() {

        stuff = {
          _init: function() {
            var $_topImage  = $('.image-1'),
                fadeStart = $_topImage.offset().top,
                fadeUntil = $_topImage.height();
            this.setEvents( fadeStart, fadeUntil, $_topImage );
          },
          setEvents: function( fadeStart, fadeUntil, $_topImage ) {
            var self = this;

            $(window).on('scroll', function() {
              self.checkPosition( fadeStart, fadeUntil, $_topImage );
            });
          },
          checkPosition: function( fadeStart, fadeUntil, $_topImage ) {

            var scrollPos = document.body.scrollTop;
            var opacity   = 0;

            if ( scrollPos<=fadeStart ) {
              opacity = 1;
            } else if( scrollPos<=fadeUntil ) {
              opacity = 1-scrollPos/fadeUntil;
            }

            $_topImage.css('opacity', opacity);

          }
        }

        stuff._init();
    }

    // parallax using ScrollMagic

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


    $('button.menu-icon').on('click', function() {
        var $_global = $('#global');

        $(this)
          .closest('.title-bar')
          .toggleClass('active');
        $_global.toggleClass('show');
    })

  }
});
