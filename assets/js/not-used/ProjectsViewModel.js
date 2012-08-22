// Main viewmodel class
define(['knockout-2.1.0'], function(ko) {
	function addCustomObservables(index, project, parentArray){
		project.lowerCaseName = ko.computed(function() {
			return project.name().toLowerCase().stripSpaces();
		});
		project.prevProjectName = ko.computed(function() {
			if(index > 0){
				return parentArray[index-1].name();
			}else{
				return "";
			}
		});
		project.nextProjectName = ko.computed(function() {
			if(index < parentArray.length-1){
				return parentArray[index+1].name();
			}else{
				return "";
			}
		});
	}
	// Overall viewmodel for this screen, along with initial state
	return function ProjectsViewModel(data) {
		var self = this;
		// viewModel = ko.observableArray(data);
		viewModel= ko.mapping.fromJS(data);
		$.each(viewModel.clients(), function(index, project){
			cLog(project.name());
			addCustomObservables(index, project, viewModel.clients());

		});
		$.each(viewModel.personal(), function(index, project){
			addCustomObservables(index, project, viewModel.personal());
		});
	}
});