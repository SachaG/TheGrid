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
	"knockout-2.1.0", 
	"knockout.mapping"
], function(
	$, 
	ko, 
	mapping
) {
	//---------------------------------------- Knockout Stuff ---------------------------------------//
	ko.mapping=mapping;
	
	function addCustomObservables(index, post, parentArray){
		post.getDomain = ko.computed(function(){
			return get_hostname(post.url());
		});
	}
	// Overall viewmodel for this screen, along with initial state
	function ProjectsViewModel(data) {
		var self = this;
		// viewModel = ko.observableArray(data);
		viewModel= ko.mapping.fromJS(data);
		$.each(viewModel.items(), function(index, post){
			addCustomObservables(index, post, viewModel.items());
		});
	}

	//---------------------------------------- Start Main jQuery Document Ready ---------------------------------------//
	$(function() {
		$.when($.getJSON(postsURL)).then(function(posts){
			ko.applyBindings(new ProjectsViewModel(posts));	
		});
	});
});