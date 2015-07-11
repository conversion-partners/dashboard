

var sentJsToTemplate = function(data, iframe){

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    console.log(this.responseText);
    var script = "var data = " + JSON.stringify(data) + ";";
    script = script + this.responseText;
    console.log(script);
    Core9.iframe.parent.sentMessageToIframe(script, iframe);
  }
  xhr.open("GET", "/dashboard/app/elements/core9-core/js/core-blocks.js");
  xhr.responseType = "text";
  xhr.send();




}



var routes = {
  '/home$/': function() {

    Core9.panel.open('panel-iframe-site');
    if (initPanelIframeSite) {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
      initPanelIframeSite = false;
    }

  },
  '/theme/edit$/': function() {

    var template = store.get('template');

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var html = Core9.xmlToString(this.responseXML);
      Core9.panel.open('panel-iframe-site');
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      Core9.iframe.write(iframe, html);
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");$(".gm-preview").trigger("click");';
      setTimeout(function(){
        Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
        var data = {
          "template" : template
        }
        sentJsToTemplate(data, iframe);
      }, 2000); // smarter needs to be handled in sendMessage to iframe
      initPanelIframeSite = false;
    }
    xhr.open("GET", template);
    xhr.responseType = "document";
    xhr.send();

  },
  '/devices$/': function() {
    Core9.panel.open('panel-content');
  },
  '/themes/.*/blocks/.*/add$/': function(req) {
    console.log('add block');
    console.log(window.location);
  },
  '/settings/setup$/': function() {},
  '/forms$/': function() {}
}
Router.addRoutes(routes);
