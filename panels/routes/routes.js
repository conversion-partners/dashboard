
var routes = {
	'/home$/' : function() {
		console.log('home', arguments);
		Core9.panel.open('panel-iframe-site');
	},
	'/devices$/' : function() {
		console.log('hitting device...');
		Core9.panel.open('panel-content');
	},
	'/blocks$/' : function() {
		console.log('hitting panel-files...');
		Core9.panel.open('panel-files');
	},
	'/settings/setup$/' : function() {
		console.log('settings/setup', arguments);
	},
	'/forms$/' : function() {
		console.log('forms', arguments);
	},
	'/pages$/' : function(req) {
		console.log('files', arguments);
	},
	'/files$/' : function(req) {
		console.log('files', arguments);
	}
}
Router.addRoutes(routes).listen();
var routes = {
	'default' : function() {
		console.log('hitting default...');
	}
}
Router.addRoutes(routes).listen();