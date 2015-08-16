if(typeof Core9 === 'undefined') {
  Core9 = {}
};
if(typeof Core9.iframe === 'undefined') {
  Core9.iframe = {}
};
Core9.iframe.parent = {
  listenToPostMessages: function () {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function (e) {
      //console.log(e);
      if(e.data.action == "showPageForm") {
        document.getElementById('page-form').click();
				setTimeout(function () {
				  if(typeof session == 'undefined') {
				    var session = {
				      account: store.get('account'),
				      theme: store.get('theme')
				    }
				  }
				  Core9.blocks.forms.init(session.account, session.theme);
				}, 1000);
      }
      if(e.data.action == 'menuClick') {
        if(typeof e.data.href !== 'undefined') {
          history.pushState(null, null, e.data.href);
        } else {
          //console.log(e.data);
          var iframe = document.getElementById('panel-iframe-menu');
          if(iframe.clientWidth > 239) {
            iframe.style.width = "40px";
            iframe.childNodes[0].style.width = "40px";
          } else {
            iframe.style.width = "240px";
            iframe.childNodes[0].style.width = "240px";
          }
        }
        setTimeout(function () {
          Core9.panel.setPanelWidth();
        }, 500);
      }
    }, false);
  },
  sentMessageToIframe: function (message, iframe) {
    var domain = location.protocol + "//" + location.host;
    if(arguments.length == 1) {
      var iframes = document.getElementsByTagName('iframe');
      for(var int = 0; int < iframes.length; int++) {
        var iframe = iframes[int].contentWindow;
        iframe.postMessage(message, domain);
      }
    } else {
      iframe.contentWindow.postMessage(message, domain);
    }
  }
}
Core9.iframe.parent.listenToPostMessages();
