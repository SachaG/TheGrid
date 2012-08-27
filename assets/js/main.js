//#=require 'lib/jquery-1.8.0.min'

// Typekit
(function() {
var config = {
  kitId: 'yym6tyc',
  scriptTimeout: 3000
};
var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
})();

// PageSlide
/*
 * jQuery pageSlide
 * Version 2.0
 * http://srobbin.com/jquery-pageslide/
 *
 * jQuery Javascript plugin which slides a webpage over to reveal an additional interaction pane.
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/
;(function(b){function j(e,a){if(0===e.indexOf("#"))b(e).clone(!0).appendTo(c.empty()).show();else{if(a){var d=b("<iframe />").attr({src:e,frameborder:0,hspace:0}).css({width:"100%",height:"100%"});c.html(d)}else c.load(e);c.data("localEl",!1)}}function k(b,a){var d=c.outerWidth(!0),f={},g={};if(!c.is(":visible")&&!h){h=!0;switch(b){case "left":c.css({left:"auto",right:"-"+d+"px"});f["margin-left"]="-="+d;g.right="+="+d;break;default:c.css({left:"-"+d+"px",right:"auto"}),f["margin-left"]="+="+d,g.left="+="+d}l.animate(f,a);c.show().animate(g,a,function(){h=!1})}}var l=b("body"),c=b("#pageslide"),h=!1,m;0==c.length&&(c=b("<div />").attr("id","pageslide").css("display","none").appendTo(b("body")));b.fn.pageslide=function(e){this.click(function(a){var d=b(this),f=b.extend({href:d.attr("href")},e);a.preventDefault();a.stopPropagation();c.is(":visible")&&d[0]==m?b.pageslide.close():(b.pageslide(f),m=d[0])})};b.fn.pageslide.defaults={speed:200,direction:"right",modal:!1,iframe:!0,href:null};b.pageslide=function(e){var a=b.extend({},b.fn.pageslide.defaults,e);c.is(":visible")&&c.data("direction")!=a.direction?b.pageslide.close(function(){j(a.href,a.iframe);k(a.direction,a.speed)}):(j(a.href,a.iframe),c.is(":hidden")&&k(a.direction,a.speed));c.data(a)};b.pageslide.close=function(c){var a=b("#pageslide"),d=a.outerWidth(!0),f=a.data("speed"),g={},i={};if(!a.is(":hidden")&&!h){h=!0;switch(a.data("direction")){case "left":g["margin-left"]="+="+d;i.right="-="+d;break;default:g["margin-left"]="-="+d,i.left="-="+d}a.animate(i,f);l.animate(g,f,function(){a.hide();h=!1;"undefined"!=typeof c&&c()})}};c.click(function(b){b.stopPropagation()});b(document).bind("click keyup",function(e){"keyup"==e.type&&27!=e.keyCode||c.is(":visible")&&!c.data("modal")&&b.pageslide.close()})})(jQuery);

$(function(){
  $('#mobile-menu').pageslide();
  
  $('.upvote-link').click(function(event){
    var $target = $(event.currentTarget);
    if($target.hasClass('voted')) return;

    var url = $target.attr('href');
    if(url !== '/login'){
      event.preventDefault();
      event.stopPropagation();
      $.ajax({
          url: url
        , type: 'POST'
        , success: function(){
          var $points = $target.find('.points');
          $points.text(($points.text() / 1) + 1);

          var $action = $target.find('.action');
          $action.text('Upvoted');

          $target.addClass('voted');
        }
        , error: function(){
          console.error('Error while trying to upvote post.');
        }
      });
    }
  });
});
