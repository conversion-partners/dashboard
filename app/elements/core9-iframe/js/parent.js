
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  console.log('parent received message!:  ',e.data);
},false);


var sentMessageToIframe = function (iframe, message){
		var domain = location.protocol + "//" + location.host;

		if(arguments.length == 1){
			var iframes = document.getElementsByTagName('iframe');
			for (var int = 0; int < iframes.length; int++) {
				var iframe = iframes[int].contentWindow;
				iframe.postMessage(message, domain);
			}
		}else{
			iframe.postMessage(message, domain);
		}
 }





window.addEventListener('iframeLoadedEvent', function (e) {
	var message = 'console.log("Hello!  The time is: ' + (new Date().getTime()) + '");';
	sentMessageToIframe(message);
}, false);