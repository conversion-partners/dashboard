Core9 = {

}

Core9.guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
				.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
			+ s4() + s4();
}

Core9.iframeLoadedEvent = new Event('iframeLoadedEvent');

Core9.ajax = function(method, url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callback(xhr);
		}
	}
	xhr.open(method, url, true);
	xhr.send(null);
}

Core9.iframe = {
	write : function(iframe, content) {
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(content);
		iframe.contentWindow.document.close();
	},
	getContent : function(iframe) {
		var document = iframe.contentDocument;
		var serializer = new XMLSerializer();
		var content = serializer.serializeToString(document);
		console.log(content);
	}
}

Core9.system = {
	    unwrapModule : function(mod) {
	      for (key in mod) {
	        if (mod.hasOwnProperty(key)) {
	          var value = mod[key];
	          return value;
	        }
	      }
	    },
	    multiImport : function(modules) {
	      return Promise.all(modules.map(function(m) {
	        return System.import(m)
	      }))
	    }
}

Core9.panel = {
	__registry : {},

	__activatePanelButton : function(panel, button) {
		button.addEventListener('click', function() {
			if (panel.style.width == '100%') {
				panel.style.width = '0px'
			} else {
				panel.style.width = '100%';
			}
		}, false);

		return button;
	},
	__createPanelButton : function() {
		var panelButton = document.createElement('div');
		panelButton.style.zIndex = "9";
		panelButton.className = "panelbutton";
		return panelButton;
	},
	__createPanel : function(id, zIndex, classes, content, button) {
		var panel = document.createElement('div');
		panel.setAttribute('id', id);
		panel.style.zIndex = zIndex.toString();
		panel.className = "panel " + classes;
		if (button) {
			panel.style.width = '100%';
			panel.appendChild(Core9.panel.__activatePanelButton(panel,
					Core9.panel.__createPanelButton()));
		}

		return panel;
	},

	iframe : {
		create : function(id, zIndex, classes, content, button) {
			var panel = Core9.panel.__createPanel(id, zIndex, classes, content,
					button);
			var guid = Core9.guid();
			var content;
			Core9.ajax('GET', content, null, function(data) {

				var iframe = document.createElement('iframe');
				iframe.setAttribute('id', id+'-'+guid);
				iframe.className = "iframe " + classes;
				document.body.appendChild(iframe);
				Core9.iframe.write(iframe, data.responseText);
				iframeWindow = iframe.contentWindow
						|| iframe.contentDocument.parentWindow;
				iframeWindow.onload = function() {
					Core9.iframeLoadedEvent.detail = {id : guid, classes : classes};
					window.dispatchEvent(Core9.iframeLoadedEvent);
					/* not working without F12
  					setTimeout(function() {
						var iframe = document.getElementById(guid);
						panel.appendChild(iframe);
						Core9.iframe.write(iframe, data.responseText);
					}, 1000);*/
				};
				content = data.responseText;
			});
			//Fixme too hacky!!
			setTimeout(function() {
				var iframe = document.getElementById(id+'-'+guid);
				panel.appendChild(iframe);
				Core9.iframe.write(iframe, content);
			}, 1000);
			return panel;
		}
	},
	div : {
		create : function(id, zIndex, classes, content, button) {
			var panel = Core9.panel.__createPanel(id, zIndex, classes, content,
					button);

			Core9
					.ajax('GET', content, null,
							function(data) {
								var guid = Core9.guid();
								var div = document.createElement('div');
								div.innerHTML = data.responseText.replace(
										'evalscript', 'evalscript-' + guid);
								panel.appendChild(div);
								var x = document.getElementById('evalscript-'
										+ guid).innerHTML;
								eval(x);
							});

			return panel;
		}
	},

	create : function(id, zIndex, classes, type, content, button) {
		return Core9.panel[type]['create']
				(id, zIndex, classes, content, button);
	},
	remove : function(id) {
	},
	update : function(id, classes, content) {
	},
	get : function(id) {
	}

}
