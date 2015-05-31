var listenToPostMessages = function() {
	var eventMethod = window.addEventListener ? "addEventListener"
			: "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent, function(e) {
		var domain = location.protocol + "//" + location.host;
		if (e.origin !== domain)
			return;
		console.log('child received message!:  ', e.data);
		sentMessageToParent('child received message!:  ' +  e.data);
	}, false);
}
listenToPostMessages();

sentMessageToParent = function(message) {
	var domain = location.protocol + "//" + location.host;
	parent.postMessage(message, domain);
}
