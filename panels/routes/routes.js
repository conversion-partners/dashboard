
var initPanelIframeSite = true;
var initPanelThemes = true;

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
		var init = function(modules) {
			var theme = Core9.system.unwrapModule(modules[0]);
      var callback = function(data){
        console.log(data);
				var themes = data[0].themes;
				if(initPanelThemes){
				Object.keys(themes).forEach(function(key) {
							var insert = {
						      "action" : "addItems",
						      "findmenusbytitle" : "Themes",
						      "addItems" : [ themes[key].data.menu ]
						  }
							Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
					});
					initPanelThemes = false;
				}



      }
      theme.get(callback);
			Core9.panel.open('panel-themes');
		}
		Core9.system.multiImport([ 'app/elements/core9-core/js/core-theme' ])
				.then(function(modules) {
					init(modules);
				});
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
