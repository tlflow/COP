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
        });
    },

    findLinks: function() {
      // ('test3', $.COP.scriptures.conversion());

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
          splitMultipleScriptures,
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

      // remove everything after "-" if using multiple scriptures
      // for example Acts 1:2-3 (just references the 1st scripture)
      splitMultipleScriptures = convertedScripture.split('-');

      convertedScripture = splitMultipleScriptures[0];

      // make everything lowercase
      convertedScripture = convertedScripture.toString().toLowerCase();

  		this.updateLinks( convertedScripture, $el );
      this.buildModals( scripture, convertedScripture );
  	},

  	updateLinks: function( scripture, element ) {
  		var $el = element;
      var findDots = new RegExp(/\./g);
      var dashedScripture = scripture.replace(findDots, '-');
      $el.data('open', scripture+'-modal').addClass('kjv-'+dashedScripture+'-modal');
  	},

    buildModals: function( scripture, convertedScripture ) {
      var glossary = COP.components.scriptures.apis.glossary;
      var content = $("#content");

      setTimeout(function(){

        for( var i=0 ; i<glossary.length-1; i++) {

          if ( scripture===$(COP.components.scriptures.apis.glossary[i]).find('.verse').text() ){
            var scriptureText = $(glossary[i]).html();

            var template = '<div class=\"reveal\" id=\"kjv-'+convertedScripture+'-modal\" data-reveal>' +scriptureText+ '<button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\"><span aria-hidden="true">&times;</span></button></div>';

            content.append(template);
          }
        }
      }, 3000);

      // setTimeout(function(){
      //   console.log('scripture', scripture);
      //   console.log('glossary', $(COP.components.scriptures.apis.glossary[14]).find('.verse').text());
      // }, 3000);

    },

    initializeModals: function() {

      var modal = [];

      $('.reveal').each(function(i, el){
        var $el = $(el);
        var $el_id = $el.attr('id');
        var findDots = new RegExp(/\./g);
        var dashedScripture = $el_id.replace(findDots, '-');

        modal[i] = new Foundation.Reveal( $el );

        $('.'+ dashedScripture ).on('click', function(e){
          e.preventDefault();
          modal[i].open();
          // console.log($(this));
        });

      });

    },

  	_init: function() {
      this.getAllScriptures();
      this.findLinks();

      setTimeout(function(){
        COP.components.scriptures.initializeModals();
      }, 4000);
    }

  }

}( jQuery ));
