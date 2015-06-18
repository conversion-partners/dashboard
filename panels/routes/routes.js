
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
		var iframe = Core9.panel.getIframeById('panel-iframe-site');
		var cmd = 'window.gm = jQuery("#mycanvas").gridmanager({controlAppend: "'+
		'<div class=\'btn-group pull-right\'>'+
		'<button title=\'Edit Source Code\' type=\'button\' class=\'btn btn-xs btn-primary gm-edit-mode\'><span class=\'fa fa-code\'></span></button><button title=\'Preview\' type=\'button\' class=\'btn btn-xs btn-primary gm-preview\'><span class=\'fa fa-eye\'></span></button>   '+
		'<div class=\'dropdown pull-left gm-layout-mode\'>'+
			''+
			'<button type=\'button\' class=\'btn btn-xs btn-primary dropdown-toggle\' data-toggle=\'dropdown\'><span class=\'caret\'></span></button> '+
			'<ul class=\'dropdown-menu\' role=\'menu\'><li><a data-width=\'auto\' title=\'Desktop\'><span class=\'fa fa-desktop\'></span> Desktop</a></li><li><a title=\'Tablet\' data-width=\'768\'><span class=\'fa fa-tablet\'></span> Tablet</a></li><li><a title=\'Phone\' data-width=\'640\'><span class=\'fa fa-mobile-phone\'></span> Phone</a></li></ul>'+
		'</div>  '+
		''+
		
			'<button type=\'button\' class=\'btn  btn-xs  btn-primary dropdown-toggle\' data-toggle=\'dropdown\'><span class=\'caret\'></span><span class=\'sr-only\'>Toggle Dropdown</span></button>'+
			'<ul class=\'dropdown-menu\' role=\'menu\'><li><a title=\'Save\'  href=\'#\' class=\'gm-save\'><span class=\'fa fa-save\'></span> Save</a></li><li><a title=\'Reset Grid\' href=\'#\' class=\'gm-resetgrid\'><span class=\'fa fa-trash-o\'></span> site</a></li></ul>' + 
		
		''+
			'<button type=\'button\' class=\'btn  btn-xs  btn-primary dropdown-toggle\' data-toggle=\'dropdown\'><span class=\'caret\'></span><span class=\'sr-only\'>Toggle Dropdown</span></button>'+
			'<ul class=\'dropdown-menu\' role=\'menu\'><li><a title=\'Save\'  href=\'#\' class=\'gm-save\'><span class=\'fa fa-save\'></span> Save</a></li><li><a title=\'Reset Grid\' href=\'#\' class=\'gm-resetgrid\'><span class=\'fa fa-trash-o\'></span> site</a></li></ul>' + 
		'</div>"}).data("gridmanager");';
		
		Core9.iframe.parent.sentMessageToIframe(cmd, iframe); 
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

