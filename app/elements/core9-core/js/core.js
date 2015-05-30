Core9 = {

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
Core9.showIframeContent = function(iframe) {
	var document = iframe.contentDocument;
	var serializer = new XMLSerializer();
	var content = serializer.serializeToString(document);
	console.log(content);
}
Core9.panelSwitch = function(panelSwitch, panelId) {
	document.getElementById(panelSwitch).addEventListener('click', function() {
		var panel = document.getElementById(panelId);
		if (panel.style.width == '0px' || panel.style.width == '') {
			panel.style.width = '100%'
		} else {
			panel.style.width = '0px';
		}
	}, false);
}