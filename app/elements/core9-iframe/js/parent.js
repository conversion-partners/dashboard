
var listenToPostMessages = function(){
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	eventer(messageEvent,function(e) {
		if(e.data.action == 'menuClick'){
			history.pushState(null, null, e.data.href);
		}
	},false);
}
listenToPostMessages();

var sentMessageToIframe = function (message, iframe){
		var domain = location.protocol + "//" + location.host;
		if(arguments.length == 1){
			var iframes = document.getElementsByTagName('iframe');
			for (var int = 0; int < iframes.length; int++) {
				var iframe = iframes[int].contentWindow;
				iframe.postMessage(message, domain);
			}
		}else{
			iframe.contentWindow.postMessage(message, domain);
		}
 }
