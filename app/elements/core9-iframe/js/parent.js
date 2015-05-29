
var sentMessageToIframe = function (message){
		var domain = location.protocol + "//" + location.host;
		var iframe = document.getElementsByTagName('iframe')[0].contentWindow;
		console.log('parent iframe:  sending message:  ' + message);
		iframe.postMessage(message, domain); // send the message and target URI
 }





window.addEventListener('iframeLoadedEvent', function (e) {
	var message = 'console.log("Hello!  The time is: ' + (new Date().getTime()) + '");';
	sentMessageToIframe(message);
}, false);