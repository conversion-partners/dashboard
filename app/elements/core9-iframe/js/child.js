Core9 = {}
Core9.listenToPostMessages = function(callback) {
	var eventMethod = window.addEventListener ? "addEventListener"
			: "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent, function(e) {
		var domain = location.protocol + "//" + location.host;
		if (e.origin !== domain)
			return;
		callback(e);
		Core9.sentMessageToParent('child received message!:  ' +  e.data);
		try {
			eval(e.data);
		} catch (e) {
		}

	}, false);
}
Core9.listenToPostMessagesCallback = function(){}
Core9.listenToPostMessages(Core9.listenToPostMessagesCallback);

Core9.sentMessageToParent = function(message) {
	var domain = location.protocol + "//" + location.host;
	parent.postMessage(message, domain);
}
