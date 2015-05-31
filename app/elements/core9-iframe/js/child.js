//respond to events

var domain = location.protocol + "//" + location.host;
window.addEventListener('message', function(event) {
	if (event.origin !== domain)
		return;
	console.log('message received:  ' + event.data, event);
	eval(event.data);
	event.source.postMessage('status: ...', event.origin);
}, false);

sentMessageToParent = function(message){
	parent.postMessage(message,domain);
}

/*setInterval(function() {
	parent.postMessage("Hello",domain);
},1000);*/