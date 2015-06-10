var routes = {
	'/home$/' : function() {
		console.log('home', arguments);
	},
	'/devices$/' : function() {
		console.log('hitting device...');
		document.querySelector('#panel-content > div.panelbutton').click();
	},
	'/blocks$/' : function() {
		console.log('hitting panel-files...');
		document.querySelector('#panel-files > div.panelbutton').click();
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