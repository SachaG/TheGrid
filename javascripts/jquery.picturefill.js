/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with divs). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
// https://github.com/scottjehl/picturefill

(function( $ ){
  $.fn.pictureFill = function() {
    $(this).find("div[data-picture]").each(function(){
      var image=$(this);

      // first, make sure we haven't generated the img tag already
      if(image.find("img").length==0){
        var sources = image.find("div");
        var matches = [];

        sources.each(function(){
          var media = $(this).attr( "data-media" );
          // if there's no media specified, OR w.matchMedia is supported 
          if( !media || ( window.matchMedia && window.matchMedia( media ).matches ) ){
            matches.push($(this));
          }
        });

        if(matches.length){
          var source=matches.pop();   
          var alt=image.attr( "data-alt" );
          var src=source.attr( "data-src" );
          var imgTag = '<img src="'+src+'" alt="'+alt+'"/>';

          if((link=image.attr("data-link")) !== null){
            image.append($('<a href="'+link+'" title="'+alt+'">'+imgTag+'</a>'));
          }else{
            image.append(imgTag);
          }
        }
      }
    });
  };
})( jQuery );