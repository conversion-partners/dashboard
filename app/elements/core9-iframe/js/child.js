//respond to events
var domain = location.protocol +"//"+ location.host;
window.addEventListener('message',function(event) {
	if(event.origin !== domain) return;
	console.log('message received:  ' + event.data,event);
	event.source.postMessage('holla back youngin!',event.origin);
},false);