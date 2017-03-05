$(function(){

  $(document).foundation();

  ///////////////
  /// timer /////
  ///////////////

  $('#sunday-clock').timer();


  //////////////////////////////////
  /// homepage form submission /////
  //////////////////////////////////

  $('form').submit( function( event ) {

    event.preventDefault();

    var trimmedComment = $.trim( $('textarea').val() );

    var formData = {

        'name'      : $('input[name=name]').val(),
        'email'     : $('input[name=email]').val(),
        'phone'     : $('input[name=phone]').val(),
        'status'    : $('select[name=status]').val(),
        'moreinfo'  : $('input[name=moreinfo]').is(':checked'),
        'joingroup' : $('input[name=joingroup]').is(':checked'),
        'comment'   : trimmedComment

    };

    $.ajax({

      type     : 'POST',
      url      : '/forms/process_home-form.php',
      data     : formData,
      dataType : 'json',
      encode   : true

    }).done( function( data ) {

      console.log( data );

      if ( ! data.success ) {

        // if ( data.errors.name ) {
        //
        // }
        console.log("show error messages");

      } else {

        // ITS ALL GOOD! SHOW SUCCESS
        $('form').append( '<div class="alert alert-success">' + data.message + '</div>' )

      }


    });

  });


  //////////////////////////////////////////
  /// fading masthead layer on homepage ////
  //////////////////////////////////////////

  // var fadingMasthead = {
  //
  // 	fadeLayer: function() {
  // 		var $_topImage, fadeStart, fadeUntil, opacity;
  //
  // 		$_topImage  = $('.image-1'),
  // 		fadeStart = $_topImage.offset().top,
  // 		fadeUntil = $_topImage.height();
  // 		opacity = 0;
  //
  // 		if ( scrollPos<=fadeStart ) {
  // 			opacity = 1;
  // 		} else if( scrollPos<=fadeUntil ) {
  // 			opacity = 1-scrollPos/fadeUntil;
  // 		}
  //
  // 		$_topImage.css('opacity', opacity);
  //
  // 	},
  //
  // 	_init: function( scrollPos ) {
  // 		this.fadeLayer( scrollPos );
  // 	}
  // };

});
