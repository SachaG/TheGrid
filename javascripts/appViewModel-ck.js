define(["knockout-2.1.0","knockout.mapping","knockout.mustache"],function(e,t,n){function r(t,n,r){n.getDomain=e.computed(function(){return get_hostname(n.url())})}e.setTemplateEngine(new n);return function(n){var i=this;viewModel=t.fromJS(n);$.each(viewModel.items(),function(e,t){r(e,t,viewModel.items())})}});