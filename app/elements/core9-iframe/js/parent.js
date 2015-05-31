
var listenToPostMessages = function(){
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent,function(e) {
	  console.log('parent received message!:  ',e.data);
	},false);
}
listenToPostMessages();

var sentMessageToIframe = function (message, iframe){
		var domain = location.protocol + "//" + location.host;
		console.log('parent sending message : ');
		console.log(message);
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
	var message = 'console.log(iframe with id : '+event.detail.id+' has loaded);';
	sentMessageToIframe(message);
}, false);