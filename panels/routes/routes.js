
var routes = {
	'/home$/' : function() {
		Core9.panel.open('panel-iframe-site');
	},
	'/devices$/' : function() {
		Core9.panel.open('panel-content');
	},
	'/blocks$/' : function() {
		Core9.panel.open('panel-files');
	},
	'/settings/setup$/' : function() {
	},
	'/themes$/' : function(){
		//Core9.panel.open('panel-themes');
		Core9.panel.open('panel-iframe-site');
	},
	'/forms$/' : function() {
	},
	'/pages$/' : function(req) {
		console.log('pages..');
		Core9.panel.open('panel-pages');
	},
	'/files$/' : function(req) {
	}
}
Router.addRoutes(routes).listen();
var routes = {
	'default' : function() {
	}
}
Router.addRoutes(routes).listen();

