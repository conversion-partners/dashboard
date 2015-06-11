
console.log('registry : ');

console.log(Core9.panellist);

var openPanel = function(openPanel){

	for (var i = 0; i < Core9.panellist.length; i++) { 
		console.log(Core9.panellist[i]);
		var panel = Core9.panel.__registry[Core9.panellist[i]];
		console.log(panel.id);
		if(panel.id){
			document.querySelector('#'+panel.id+' > div.panelbutton > div.close').click();
		}
	}
	document.querySelector('#'+openPanel+' > div.panelbutton > div.open').click();
}








var routes = {
	'/home$/' : function() {
		console.log('home', arguments);
		openPanel('panel-iframe-site');
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