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
      this.buildModals( scripture, convertedScripture );
  	},

  	updateLinks: function( scripture, element ) {
  		var $el = element;
  		$el.data('open', scripture+'-modal');
  	},

    buildModals: function( scripture, convertedScripture ) {
      var glossary = COP.components.scriptures.apis.glossary;
      var content = $("#content");




      setTimeout(function(){

        // if ( $(glossary[0]).find('.verse').text()===scripture ) {

        // }

        var scriptureText = $(glossary[0]).html();

        var template = '<div class=\"reveal\" id=\"'+convertedScripture+'-modal\" data-reveal>' +scriptureText+ '</div>';


              //   <h2>Deuteronomy 8:18</h2>
              //   <p><span>18</span> But thou shalt remember the Lord thy God: for it is he that giveth thee power to get wealth, that he may establish his covenant which he sware unto thy fathers, as it is this day.</p>
              //   <button class="close-button" data-close aria-label="Close modal" type="button">
              //     <span aria-hidden="true">&times;</span>
              //   </button>
              // </div>

        content.append(template);

        var $modal = $('#Act.2.4-modal');

        $modal.html(template);

        var popup = new Foundation.Reveal( $modal );

        // popup.open();

        // console.log($modal);

        // console.log('template', template);

      }, 2000);
    },

  	_init: function() {
      this.getAllScriptures();
      this.findLinks();
    }

  }

}( jQuery ));
