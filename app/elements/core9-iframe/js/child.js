//respond to events

var domain = location.protocol + "//" + location.host;
window.addEventListener('message', function(event) {
	if (event.origin !== domain)
		return;
	console.log('message received:  ' + event.data, event);
	eval(event.data);
	event.source.postMessage('status: ...', event.origin);
}, false);



setInterval(function() {
	// Send the message "Hello" to the parent window
	// ...if the domain is still "davidwalsh.name"
	parent.postMessage("Hello","http://www.convertforce.com");
},1000);