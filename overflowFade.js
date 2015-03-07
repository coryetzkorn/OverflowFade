/*!
* jQuery overflowFade; version: 1.0.0
* http://coryetzkorn.com
* Copyright (c) 2015 Cory Etzkorn; Dual licensed: MIT/GPL
*/
(function ( $ ) {

  var methods = {
    init : function(options) {
      // default settings
      var settings = $.extend({
        direction: "horizontal",
        tolerance: 0
      }, options );
      
      // Plugin code
      return this.each(function() {
        var wrapperEl = $(this);
        
        wrapperEl.wrapInner('<div class="overflow-scrollable"></div>');
        wrapperEl.addClass('scroll-start');
        
        var scrollableEl = wrapperEl.find('.overflow-scrollable');
        
        var scrollStart = settings.tolerance;
        
        if(settings.direction == 'horizontal') {
          $(this).addClass('overflow-fade-horizontal');
          var innerWidth = 0;
          wrapperEl.find('li').each(function() {
            innerWidth += $(this).outerWidth(true);
          });
          wrapperEl.find('ul').width(innerWidth); 
          var scrollEnd =  innerWidth - wrapperEl.width() - settings.tolerance;
          scrollableEl.scroll(function() {
            if($(this).scrollLeft() > scrollStart) {
              wrapperEl.removeClass('scroll-start');
            } else {
              wrapperEl.addClass('scroll-start');
            }
            if($(this).scrollLeft() >= scrollEnd) {
              wrapperEl.addClass('scroll-end');
            } else {
              wrapperEl.removeClass('scroll-end');
            }
          });
        } else {
          $(this).addClass('overflow-fade-vertical');
          var innerHeight = wrapperEl.find('ul').height();
          var scrollEnd =  innerHeight - wrapperEl.height() - settings.tolerance;
          scrollableEl.scroll(function() {
            if($(this).scrollTop() > scrollStart) {
              wrapperEl.removeClass('scroll-start');
            } else {
              wrapperEl.addClass('scroll-start');
            }
            if($(this).scrollTop() >= scrollEnd) {
              wrapperEl.addClass('scroll-end');
            } else {
              wrapperEl.removeClass('scroll-end');
            }
          });
        } 
      });
    },
    destroy : function( ) {
      return this.each(function() {
        var wrapperEl = $(this);
        wrapperEl.removeClass('overflow-fade-vertical overflow-fade-horizontal scroll-start scroll-end');
        wrapperEl.find('ul').width('');
        wrapperEl.unbind('scroll');
      });
    }
  };
  $.fn.overflowFade = function(methodOrOptions) {
    
    if ( methods[methodOrOptions] ) {
        return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return methods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.overflowFade' );
    } 
      
  }
}( jQuery ));