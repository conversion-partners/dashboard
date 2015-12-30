if(typeof Core9 === 'undefined') {
  Core9 = {}
};
if(typeof Core9.iframe === 'undefined') {
  Core9.iframe = {}
};
Core9.iframe.parent = {
  // send and handle actions with proper events and event handling!!!
  listenToPostMessages: function () {
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, function (e) {
      //console.log(e);


      if(e.data.action == "hideAjaxLoader") {
        console.log('hideAjaxLoader');
        var event = new CustomEvent("hideAjaxLoader", {
          "detail": "Hide ajax loader"
        });
        window.dispatchEvent(event);
      }
      if(e.data.action == "showAjaxLoader") {
        console.log('showAjaxLoader');
        var event = new CustomEvent("showAjaxLoader", {
          "detail": "Show ajax loader"
        });
        window.dispatchEvent(event);
      }
      if(e.data.action == "showPageForm") {
        setTimeout(function () {
          document.getElementById('page-form').click();
          Core9.iframe.parent.sentMessageToIframe(e.data, document.querySelector('#iframe-form-holder'));
        }, 100);
      }
      if(e.data.action == "resetPageEditor") {
        setTimeout(function () {
          var iframe = Core9.panel.getIframeById('panel-iframe-site');
          var cmd = 'Core9.blocks.handler.init();';
          Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
        }, 0);
      }
      if(e.data.action == 'cogClick') {
        //console.log(e.data);
        var parts = e.data.href.split('/');
        var block = parts[parts.length - 2];
        //console.log(block);
        var url = '/dashboard/blockpreview/data/accounts/' + store.get('account') + '/blocks/bower_components/' + block + '/index.html';
        history.pushState(null, null, url);
        return false;
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
