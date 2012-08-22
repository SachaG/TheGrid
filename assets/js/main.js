//#=require 'lib/jquery-1.8.0.min'

$(function(){
  $('.upvote-link').click(function(event){
    event.preventDefault();
    event.stopPropagation();

    var $target = $(event.currentTarget);
    var url = $target.attr('href');
    $.ajax({
        url: url
      , type: 'POST'
      , success: function(){
        console.log('success');
      }
      , error: function(){
        console.log('error');
      }
    });
  });
});
