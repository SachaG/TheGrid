vars=getUrlVars();

debug=true;
vars=getUrlVars();
if("debug" in vars){
  debug=true;
}

$("body, html").removeClass("no-js");

function get_hostname(url) {
	var m = ((url||'')+'').match(/^http:\/\/[^/]+/);
	return m ? m[0].substr(7) : null;
}
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

cLog=function(s){
  if(debug){
	console.log(s);
  }
};

// dataURL='http://api.ihackernews.com/page?format=jsonp&callback=?';
dataURL='posts.json';

require.config({
	paths: {
		knockout: 			"libs/knockout-2.1.0",
		mapping: 			"libs/knockout.mapping",
		mustache: 			"libs/mustache",
		typekit: 			"plugins/typekit"
	}
})
require([
	"jquery",
	"mustache",
	"knockout", 
	"mapping",
	"libs/sammy",
	"typekit",
	"plugins/jquery.history"
], function(
	$,
	Mustache,
	ko, 
	mapping
) {
	//---------------------------------------- Knockout Stuff ---------------------------------------//
	ko.mapping=mapping;
	window.ko=ko;
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
		post.getIndex = ko.computed(function(){
			return index+1;
		});
		post.getPopularity = ko.computed(function(){
			var points=post.points();
			if(points < 20){
				return "low";
			}else if(points < 50){
				return "medium";
			}else if(points < 100){
				return "hot";
			}else if(points < 250){
				return "superhot";
			}else if(points < 500){
				return "megahot";
			}else{
				return "gigahot";
			}

		})
	}
	// Overall viewmodel for this screen, along with initial state
	function GridViewModel() {
		var self = this;
		// viewModel = ko.observableArray(data);
		// viewModel= ko.mapping.fromJS();

		// $.each(viewModel.items(), function(index, post){
		// 	addCustomObservables(index, post, viewModel.items());
		// });

		self.homeData = ko.observable();
		self.postId = ko.observable();
		self.postData = ko.observable();

		// this.getDomain = ko.computed(function(){
		// 	return get_hostname(this.url());
		// }, self.postData());

		// Behaviours
		
		self.goToHome = function() { 
			location.hash = 'top';
		};

		self.goToPost = function() {
			location.hash = 'post';
		};


		Sammy(function() {
			this.get('#top', function() {
				self.postData(null);
				$.getJSON('posts.json', {}, self.homeData);
			});

			this.get('#post', function() {
				self.homeData(null);
				$.getJSON('post.json', {}, self.postData);
			});
		    this.get('', function() { this.app.runRoute('get', '#top') });
		}).run();

		self.goToHome();
	}

	//---------------------------------------- Start Main jQuery Document Ready ---------------------------------------//
	$(function() {
		$(".posts").hide();
		ko.applyBindings(new GridViewModel());

		$.when(loadTypekit).then(function(){
			$("#spinner").fadeOut("fast");
			$(".posts").fadeIn("medium");
		});	
		// $.when($.getJSON(dataURL)).then(function(data){

		// 	ko.applyBindings(new GridViewModel(data));

		// 	$.when(loadTypekit).then(function(){
		// 		$("#spinner").fadeOut("fast");
		// 		$(".posts").fadeIn("medium");
		// 	});	
		// });
	});
});
