$("body, html").removeClass("no-js");

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
	"jquery.hotkeys", 
	"plugins"
], function(
	$, 
	mustache,
	ko, 
	mapping,
	mustacheTemplateEngine,
	appViewModel
) {
	//---------------------------------------- Knockout Stuff ---------------------------------------//


		ko.mapping=mapping;



		//---------------------------------------- Start Main jQuery Document Ready ---------------------------------------//
		$(function() {
			$.when($.getJSON(postsURL)).then(function(posts){
				ko.applyBindings(new appViewModel(posts));	
			});
		});
});
