var debug=false;
vars=getUrlVars();
if("debug" in vars){
  debug=true;
}

cLog=function(s){
  if(debug){
    console.log(s);
  }
};

String.prototype.stripSpaces = function(){
  return this.replace(' ', '');
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

// http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
function removeHash () {
  location.hash="#";
  // history.pushState("", document.title, window.location.pathname+window.location.search);
}

function activateProject(projectName){
  var $projectContent=$("#"+projectName+"-content");
  window.resizeActive=false;     // set resizeActive to false to deactivate fitHeight and fitText while in project state
  window.activeProject=projectName;
  $("body").scrollTop(0);
  $("body").removeClass("home-state").addClass("project-state").addClass(projectName+"-state");
  // if(!$projectContent.hasClass("floating-widget")){
  //   $projectContent.addClass("floating-widget");
  //   $projectContent.find('.info .widget').floatingWidget({
  //     paddingTop:   20,
  //     activeProject: projectName
  //   });
  // }
}

function deactivateProject(projectName){
  var $projectContent=$("#"+projectName+"-content");
  $projectContent.find('.widget').removeClass("floating pinned-bottom");
}

function launchProject(projectName){
  cLog("\n\nLaunching project: "+projectName);    
  var project="#"+projectName+"-project";
  var projectCircle="#"+projectName+"-project .circle";
  var projectIcon="#"+projectName+"-project .project-icon";
  var projectContent="#"+projectName+"-content";
  $(project).toggleActive();  
  $(projectContent).toggleActive();
  $(projectContent).pictureFill();
  $(projectCircle+", "+projectIcon+", .content-wrapper").monitorTransition("launching-transition", function(){
    cLog("           Executing launch callback");
    activateProject(projectName);
  });
  return false;
}

function openProject(projectName){
  cLog("\n\nOpening project: "+projectName);
  var project="#"+projectName+"-project";
  var projectCircle="#"+projectName+"-project .circle";
  var projectContent="#"+projectName+"-content";
  $(project).toggleActive();  
  $(projectContent).toggleActive();
  $(projectContent).pictureFill();
  $(projectCircle+", .content-wrapper").monitorTransition("opening-transition", function(){
    cLog("           Executing open callback");
    activateProject(projectName);
  });
  return false;
}

function closeProject(projectName){
  cLog("\n\nClosing project: "+projectName);
  // make sure a project is currently open
  if($("body").hasClass("project-state")){
    // get currently active project
    var project="#"+projectName+"-project";
    var projectCircle="#"+projectName+"-project .circle";
    var projectIcon="#"+projectName+"-project .project-icon";
    var projectContent="#"+projectName+"-content";
    // fade out main content and scroll it back to top since all projects share same div
    window.contentWrapper.scrollTop(0);
    // set resizeActive back to true to reactivate fitHeight and fitText
    window.resizeActive=true;
    // start monitoring the transition, then toggle project activity
    $(projectCircle+", "+projectIcon+", .content-wrapper").monitorTransition("closing-transition", function(){
      cLog("%%% close project callback");
      $("body").removeClass("project-state").addClass("home-state").removeClass(projectName+"-state");
      // reset activeProject variable
      deactivateProject(projectName);
      delete window.activeProject;
      $(project).makeInactive();
      $(projectContent).makeInactive();
    });
    return false;
  }
}

function switchProjectWithTransition(originName, targetName){
  cLog("\n\nSwitching from "+originName+" to "+targetName);
  var origin="#"+originName+"-project";
  var target="#"+targetName+"-project";
  var originCircle="#"+originName+"-project .circle";
  var targetCircle="#"+targetName+"-project .circle"; 
  var originContent="#"+originName+"-content";
  var targetContent="#"+targetName+"-content";  
  $(origin+" ,"+originContent).addClass("origin");
  $(target+" ,"+targetContent).addClass("target");
  $(originCircle+", "+targetCircle+", "+originContent+", "+targetContent).monitorTransition("switching-transition", function(){
    window.activeProject=targetName;
    window.contentWrapper.animate({scrollTop:0}, 'medium');
    $(origin).removeClass("origin").toggleActive();
    $(target).removeClass("target").toggleActive();
    $(origin).toggleActive();
    $(target).toggleActive();
    $(originContent).toggleActive();
    $(targetContent).toggleActive();
  });
}

function switchProject(originName, targetName){
  cLog("\n\nSwitching from "+originName+" to "+targetName);
  $("#"+originName+"-project").makeInactive();
  $("#"+targetName+"-project").makeActive();
  $("#"+originName+"-content").makeInactive();
  $("#"+targetName+"-content").makeActive();
  $("#"+targetName+"-content").pictureFill();
  deactivateProject(originName);
  activateProject(targetName);
}


// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


(function( $ ){
	
  $.fn.fitText = function( kompressor, options ) {	   
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);
    return this.each(function(){
      // Store the object
      var $this = $(this);     
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        if(window.resizeActive){
          $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        }
      };
      // Call once to set.
      resizer();			
      // Call on resize. Opera debounces their resize by default. 
      $(window).on('resize', resizer);   	
    });
  };
})( jQuery );

(function( $ ){
  $.fn.fitHeight = function() {
    return this.each(function(index, element){
      // Store the object
      var $this = $(this);  
      var resizer = function () {
        if(window.resizeActive){
          // get the width of the first element, unless of course we're on the first element in which case we get our own width
          var index=$this.index();
          // cLog(index);
          if(index>0){
          var firstWidth=$this.siblings(":first-child").width();
                    width=firstWidth;

        }else{
                    width=$this.width();

        }
          // cLog(width);
          // $this.siblings().each(function(){
          // });
          $this.height(width);
        }
      };
      // Call once to set.
      resizer();   
      // Call on resize. Opera debounces their resize by default. 
      $(window).on('resize', resizer);   
    });
  };
})( jQuery );

// toggleActive
// toggle a project's active state
(function( $ ){
  $.fn.toggleActive = function() {
  $this=$(this);
  if($this.hasClass("inactive")){
    $this.makeActive();
  }else{
    $this.makeInactive();
  }
  return this;
  };
})( jQuery );

(function( $ ){
  $.fn.makeActive = function() {
    // inactive -> active
    $(this).removeClass("inactive").addClass("active");
    return this;
  };
})( jQuery );

(function( $ ){
  $.fn.makeInactive = function() {
    // inactive -> active
    $(this).removeClass("active").addClass("inactive");
    return this;
  };
})( jQuery );

// monitorTransition
// monitor target element and add class to body and itself while it's undergoing a transition
(function( $ ){
  $.fn.monitorTransition = function(bodyClass, callback, timeout) {
    var $elements=this; // "var" is very important otherwise setTimeout uses global variable
    var numberOfElements=this.size();
    var callbackNumber=0;
    var startTime=new Date().getTime();
    if(typeof(timeout)==='undefined') var timeout = 8000;

    cLog("0ms        Monitoring transition for: ");
    $elements.each(function(){
      cLog("            - "+$(this).attr("class"));
    });
    $("body").addClass("transition "+bodyClass);
    $elements.removeClass("resting").addClass("transitioning");

    // Run callback once the last transition has ended
    $elements.on('webkitTransitionEnd transitionend oTransitionEnd msTransitionEnd', function( event ) {
      // Increment the callback counter
      callbackNumber++;
      time= (new Date().getTime())-startTime;
      cLog(time+"ms     Callback "+callbackNumber+" for "+event.currentTarget.className+" on "+event.originalEvent.propertyName);
      // cLog(event);
      // Only execute the callback function if this is the last callback (i.e. the callback for the longest transition)
      if(callbackNumber==numberOfElements){
        // if($this.attr("id")==event.currentTarget.id){
          cLog("           Transition ended for "+event.currentTarget.className);

          // make sure we only trigger callback for the right element
          $("body").removeClass("transition "+bodyClass);
          $elements.removeClass("transitioning").addClass("resting");
          // remove transition callback
          $elements.off();
          // execute the callback function that was passed as parameter
          callback();
        // }else{
        //   cLog("      -> Transition ended: wrong element");
        // }
      }
    });
    setTimeout(function(){
      if(callbackNumber!=numberOfElements){
        time= (new Date().getTime())-startTime;
        cLog(time+"ms       Timeout ended for: ");
        $elements.each(function(){
          cLog("        - "+$(this).attr("class"));
        });
        $("body").removeClass("transition "+bodyClass);
        $elements.removeClass("transitioning");
        callback();
      }
    }, timeout);
    return this;
  };
})( jQuery );









//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);

$.fn.spin = function(opts) {
  this.each(function() {
    var $this = $(this),
        data = $this.data();
    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if (opts !== false) {
      data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
    }
  });
  return this;
};


/*!
 * jQuery Floating Widget plugin v0.9.2
 * http://terkel.jp/archives/2011/05/jquery-floating-widget-plugin/
 *
 * Copyright (c) 2011 Takeru Suzuki, http://terkel.jp/
 * Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 */
(function ($) {
    $.fn.floatingWidget = function (options) {
        var test=function(){
          cLog("bla");
        }
        var activateWidget=function ($this, $parent, $window, top) {
            var y      = $window.scrollTop() + opts.paddingTop,
                bottom = $parent.offset().top + $parent.height() - $this.outerHeight(true);
            cLog("/////");
            cLog($this);
            cLog("y "+y);
            cLog("top "+top);
            cLog("bottom "+bottom);
            if (y > top) {
                $this.addClass("floating");
                if (y > bottom) {
                    $this.removeClass("floating").addClass("pinned-bottom");
                } else {
                    $this.removeClass("pinned-bottom");
                }
            } else {
                $this.removeClass("floating");
            }
        }
        var opts = $.extend({
                activeProject:   "",  
                paddingTop:     0
            }, options);
        return this.each(function () {
            var $this             = $(this),
                $parent           = $this.offsetParent(),
                $window           = $(window),
                top               = $this.offset().top - parseFloat($this.css('marginTop').replace(/auto/, 0));
                $this.width($this.parent().width());
            if ($parent.height() > $this.outerHeight(true)) {
                $(window).on('scroll', function () {
                  if(window.activeProject==opts.activeProject){
                    var y      = $window.scrollTop() + opts.paddingTop,
                        bottom = $parent.offset().top + $parent.height() - $this.outerHeight(true);
                    cLog("/////");
                    cLog($this);
                    cLog("y "+y);
                    cLog("top "+top);
                    cLog("bottom "+bottom);
                    if (y > top) {
                        $this.addClass("floating");
                        if (y > bottom) {
                            $this.removeClass("floating").addClass("pinned-bottom");
                        } else {
                            $this.removeClass("pinned-bottom");
                        }
                    } else {
                        $this.removeClass("floating");
                    }
                  }
                });
            }
        });
    };
})(jQuery);
