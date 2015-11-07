$.widget( "COP.pageNavigation", {

  _create: function() {
    // links
    $( 'body').on( 'click', '#global a', function(evt){
      evt.preventDefault();

      var navitem = $(this).data( 'link' );
      alert(navitem);
    });

    // menu button
    $( 'body').on( 'click', '#menu', function(evt){
      evt.preventDefault();

      var menubutton = $(this),
          menuscreen = $('#global');

      menuscreen.toggleClass('active');
    });
  }
});
