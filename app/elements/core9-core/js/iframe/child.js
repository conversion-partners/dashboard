if (typeof Core9 === 'undefined') {
	Core9 = {}
};
if (typeof Core9.iframe === 'undefined') {
	Core9.iframe = {}
};
if (typeof Core9.iframe.child === 'undefined') {
	Core9.iframe.child = {}
};
Core9.iframe.child.listenToPostMessages = function(callback) {
	var eventMethod = window.addEventListener ? "addEventListener"
			: "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent, function(e) {
		var domain = location.protocol + "//" + location.host;
		if (e.origin !== domain)
			return;
		callback(e);
		//Core9.sentMessageToParent('child received message!:  ' +  e.data);
		try {
			eval(e.data);
		} catch (e) {
		}

	}, false);
}
Core9.iframe.child.listenToPostMessagesCallback = function(){}
Core9.iframe.child.listenToPostMessages(Core9.iframe.child.listenToPostMessagesCallback);

Core9.iframe.child.sentMessageToParent = function(message) {
	var domain = location.protocol + "//" + location.host;
	parent.postMessage(message, domain);
}
