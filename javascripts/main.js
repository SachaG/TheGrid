debug=true;

$("body, html").removeClass("no-js");

function get_hostname(url) {
    var m = ((url||'')+'').match(/^http:\/\/[^/]+/);
    return m ? m[0].substr(7) : null;
}

cLog=function(s){
  if(debug){
    console.log(s);
  }
};

// postsURL='http://api.ihackernews.com/page?format=jsonp&callback=?';
postsURL='posts.json';

require.config({
	paths: {
		knockout: 			"libs/knockout-2.1.0",
		mapping: 			"libs/knockout.mapping",
		mustache: 			"libs/mustache"
	}
})
require([
	"jquery",
	"mustache",
	"knockout", 
	"mapping"
], function(
	$,
	Mustache,
	ko, 
	mapping
) {
	//---------------------------------------- Knockout Stuff ---------------------------------------//
	ko.mapping=mapping;
	
	ko.mustacheTemplateEngine = function () { }
	ko.mustacheTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
		renderTemplateSource: function (templateSource, bindingContext, options) {
			var data = bindingContext.$data;
			var templateText = templateSource.text();		
			var htmlResult = Mustache.to_html(templateText, data);
			
			return ko.utils.parseHtmlFragment(htmlResult);
		},
		allowTemplateRewriting: false,
		version: '0.9.0'
	});
	ko.setTemplateEngine(new ko.mustacheTemplateEngine());
	
	function addCustomObservables(index, post, parentArray){
		post.getDomain = ko.computed(function(){
			return get_hostname(post.url());
		});
		post.getIndex = ko.computed(function() {
			return index+1;
		})
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
		$(".posts").hide();
		$.when($.getJSON(postsURL)).then(function(posts){
			ko.applyBindings(new ProjectsViewModel(posts));
			$("#spinner").fadeOut("fast");
			$(".posts").fadeIn("medium");	
		});
	});
});
