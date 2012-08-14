define(['knockout-2.1.0', 'knockout.mapping', 'knockout.mustache'], function(ko, mapping, mustacheTemplateEngine) {

	function addCustomObservables(index, post, parentArray){
		post.getDomain = ko.computed(function(){
			return get_hostname(post.url());
		});
	}
	// Overall viewmodel for this screen, along with initial state
	return function appViewModel(data) {
		var self = this;
		// viewModel = ko.observableArray(data);
		viewModel= mapping.fromJS(data);
		cLog(data);
		// $.each(viewModel.items(), function(index, element){
		// 	cLog(element.title());
		// });
		$.each(viewModel.items(), function(index, post){
			addCustomObservables(index, post, viewModel.items());
		});

	}
});