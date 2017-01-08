if (typeof(COP) != "object") COP = {};
if (!COP.components) COP.components = {};
;(function($) {

  COP.components.scriptures = {

    apis: {
      glossary: []
    },

    getAllScriptures: function() {
      $.ajax('../scriptures.html')
        .done(function(resp){
          // $scripture_modal.html(resp).foundation('open');
          var scriptureUl = $(resp).find('ul.verses');

          scriptureUl.find('li').each(function(){
            var this = $(this);
            COP.components.scriptures.apis.glossary.push(this);
          });

          // $.each($(scriptureUl +' li'), function( index, value ) {
          //   console.log( index + ": " + value );
          //   // COP.components.scriptures.apis.glossary.push(value);
          // });

          console.log('scruiptures api', COP.components.scriptures.apis.glossary);
        });
    },

    findLinks: function() {
      // console.log('test3', $.COP.scriptures.conversion());

      $('[rel=scripture]').each( function(){
  			var self = $(this);
        COP.components.scriptures.conversion(self.text(), self);
  		} )
  	},

  	conversion: function(scripture, element) {
  		var $el,
          book,
          splitScripture,
          firstSegment,
          findChars,
          verse,
          lastSegment,
          convertedScripture;

  		$el = element;
  		splitScripture = scripture.split(' ');
  		firstSegment =  splitScripture[0];

  		if ( firstSegment==="1" || firstSegment==="2" ) {
  			// scripture starts with a number
  			book = splitScripture[1].substr(0, 3);
  			// add number part of book back to beginning
  			book = splitScripture[0]+book;
  		} else {
  			// scripture starts with a letter
  			book = splitScripture[0].substr(0, 3);
  		}

  		// set up regex to find all spaces and colons
  		findChars = new RegExp(/\s|:/g);

  		lastSegment = splitScripture.length-1;

  		// use regex to replace spaces and colons
  		verse = splitScripture[lastSegment].replace(findChars, '.');

  		// put book and verse together
  		convertedScripture = book+'.'+verse;

  		this.updateLinks( convertedScripture, $el );
  	},

  	updateLinks: function( scripture, element ) {
  		var $el = element;
  		$el.data('open', scripture+'-modal');
      this.buildModals( element );
  	},

    buildModals: function( element ) {
      var $el = element;

      // var $modal = $el.

    },

  	_init: function() {
      this.getAllScriptures();
      this.findLinks();
    }

  }

}( jQuery ));
