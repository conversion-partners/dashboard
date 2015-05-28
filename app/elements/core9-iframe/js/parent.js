
var sentMessageToIframe = function (){
		var domain = location.protocol + "//" + location.host;
		var iframe = document.getElementsByTagName('iframe')[0].contentWindow;
		var message = 'Hello!  The time is: ' + (new Date().getTime());
		console.log('blog.local:  sending message:  ' + message);
		iframe.postMessage(message, domain); // send the message and target URI
 }

setInterval(function() {
	//sentMessageToIframe();
}, 6000);



window.addEventListener('iframeLoadedEvent', function (e) {
	sentMessageToIframe();
}, false);