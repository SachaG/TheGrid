$("body, html").removeClass("no-js");

var debug=true;

cLog=function(s){
  if(debug){
    console.log(s);
  }
};

function get_hostname(url) {
	var m = ((url||'')+'').match(/^http:\/\/[^/]+/);
	return m ? m[0].substr(7) : null;
}

postsURL='http://api.ihackernews.com/page'+'?callback=?';
postsURL='http://api.ihackernews.com/page';
postsURL='load-json.php';
postsURL='http://api.ihackernews.com/page?format=jsonp&callback=?';
postsURL='posts.json';

require([
	"jquery", 
	"mustache",
	"knockout-2.1.0", 
	"knockout.mapping",
	"knockout.mustache",
	"appViewModel",
	"jquery.hotkeys"
], function(
	$, 
	mustache,
	ko, 
	mapping,
	mustacheTemplateEngine,
	appViewModel
) {
	//---------------------------------------- Knockout Stuff ---------------------------------------//
	ko.setTemplateEngine(new mustacheTemplateEngine());

		//---------------------------------------- Start Main jQuery Document Ready ---------------------------------------//
		$(function() {
			$.when($.getJSON(postsURL)).then(function(posts){
				console.log("json loaded!");
				allPosts=new appViewModel(posts);
				cLog(allPosts);
				ko.applyBindings(allPosts);
			});
		});
});
