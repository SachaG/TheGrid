//#=require 'lib/jquery-1.8.0.min'

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
