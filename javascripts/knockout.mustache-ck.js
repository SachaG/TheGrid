/*!
 * Mustache Template Engine for Knockout
 * http://github.com/WTK/ko.mustache.js
 *
 * Copyright Marcin Wtorkowski
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 *//**
* The following section is documentation from Knockout v2 regarding how to create a template engine.
*/// If you want to make a custom template engine,
//
// [1] Inherit from this class (like ko.nativeTemplateEngine does)
// [2] Override 'renderTemplateSource', supplying a function with this signature:
//
//        function (templateSource, bindingContext, options) {
//            // - templateSource.text() is the text of the template you should render
//            // - bindingContext.$data is the data you should pass into the template
//            //   - you might also want to make bindingContext.$parent, bindingContext.$parents,
//            //     and bindingContext.$root available in the template too
//            // - options gives you access to any other properties set on "data-bind: { template: options }"
//            //
//            // Return value: an array of DOM nodes
//        }
//
// [3] Override 'createJavaScriptEvaluatorBlock', supplying a function with this signature:
//
//        function (script) {
//            // Return value: Whatever syntax means "Evaluate the JavaScript statement 'script' and output the result"
//            //               For example, the jquery.tmpl template engine converts 'someScript' to '${ someScript }'
//        }
//
//     This is only necessary if you want to allow data-bind attributes to reference arbitrary template variables.
//     If you don't want to allow that, you can set the property 'allowTemplateRewriting' to false (like ko.nativeTemplateEngine does)
//     and then you don't need to override 'createJavaScriptEvaluatorBlock'.
define(["knockout-2.1.0","mustache"],function(e,t){e.mustacheTemplateEngine=function(){};e.mustacheTemplateEngine.prototype=e.utils.extend(new e.templateEngine,{renderTemplateSource:function(n,r,i){var s=r.$data,o=n.text(),u=t.to_html(o,s);return e.utils.parseHtmlFragment(u)},allowTemplateRewriting:!1,version:"0.9.0"});return e.mustacheTemplateEngine});