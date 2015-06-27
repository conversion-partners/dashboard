
var initPanelIframeSite = true;

var routes = {
	'/home$/' : function() {

		Core9.panel.open('panel-iframe-site');
		if(initPanelIframeSite){
			var iframe = Core9.panel.getIframeById('panel-iframe-site');
			var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
			Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
			initPanelIframeSite = false;
		}

	},
	'/devices$/' : function() {
		Core9.panel.open('panel-content');
	},
	'/blocks$/' : function() {
	},
	'/settings/setup$/' : function() {
	},
	'/themes$/' : function(){
		Core9.panel.open('panel-themes');
	},
	'/themes/.*/' : function() {

		Core9.panel.open('panel-iframe-site');
		if(initPanelIframeSite){
			var iframe = Core9.panel.getIframeById('panel-iframe-site');
			var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
			Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
			initPanelIframeSite = false;
		}

	},
	'/forms$/' : function() {
	},
	'/pages$/' : function(req) {
		Core9.panel.open('panel-pages');
	},
	'/files$/' : function(req) {
				Core9.panel.open('panel-files');
	}
}
Router.addRoutes(routes).listen();
var routes = {
	'default' : function() {
	}
}
Router.addRoutes(routes).listen();
