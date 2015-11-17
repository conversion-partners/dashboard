require.config({
  baseUrl: "assets/js/lib/",
  paths: {
	'jquery': 'http://code.jquery.com/jquery-2.1.0',
	'mustache' : "http://cdn.rawgit.com/janl/mustache.js/master/mustache",
	'bootstrap' : "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min",
	'underscore' :  "http://cdn.rawgit.com/jashkenas/underscore/master/underscore",
	'text'  : "https://cdn.rawgit.com/requirejs/text/master/text",
	'app'   : "..",
	 collections : "../collections",
	 data        : "../data",
	 models      : "../models",
	 helper      : "../helper",
	 templates   : "../templates",
	 views       : "../views"
  }, shim: {
    'underscore': {
	      exports: '_'
	},

    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    }
  }
});

require(['app/app'], function(app){
  app.initialize();
});
