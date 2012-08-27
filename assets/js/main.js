//#=require 'lib/jquery-1.8.0.min'

// Typekit
(function() {
var config = {
  kitId: 'yym6tyc',
  scriptTimeout: 3000
};
var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
})();

$(function(){
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
