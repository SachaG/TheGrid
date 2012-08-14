// http://blog.typekit.com/2011/05/25/loading-typekit-fonts-asynchronously/
// https://github.com/typekit/typekit-async-patterns/blob/master/font-events-jquery.html

// (function() {
// var config = {
// kitId: 'hfk4atd',
// scriptTimeout: 3000
// };
// var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
// })();

var loadTypekit=new $.Deferred();

(function() {
var config = {
    kitId: 'hfk4atd',
    scriptTimeout: 3000,
    active: function() {
        loadTypekit.resolve();
    }
};
var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
})();

// function loadTypekit() {
// 	var config = {
// 		kitId: 'hfk4atd',
// 		scriptTimeout: 3000
// 	};
// 	$('html').addClass('wf-loading');
// 	var t = setTimeout(function() {
// 		$('html').removeClass('wf-loading').addClass('wf-inactive');
// 	}, config.scriptTimeout);
// 	return $.ajax({
// 		url: '//use.typekit.net/' + config.kitId + '.js',
// 		dataType: 'script',
// 		cache: true,
// 		success: function() {
// 			clearTimeout(t);
// 			try { Typekit.load(config); } catch (e) {}
// 		}
// 	});
// };