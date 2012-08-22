//#=require 'lib/jquery-1.8.0.min'

$(function(){
  $('.upvote-link').click(function(event){
    event.preventDefault();
    event.stopPropagation();

    var $target = $(event.currentTarget);
    if($target.hasClass('disabled')) return;

    var url = $target.attr('href');
    $.ajax({
        url: url
      , type: 'POST'
      , success: function(){
        var $points = $target.find('.points');
        $points.text(($points.text() / 1) + 1);
        $target.addClass('disabled');
      }
      , error: function(){
        console.error('Error while trying to upvote post.');
      }
    });
  });
});
