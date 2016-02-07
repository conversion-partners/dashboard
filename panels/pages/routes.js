var pageRoutes = {
  '/page/edit$/': function() {

    var template = store.get('template');
    var page = store.get('page');
    var theme = store.get('theme');
    var account = store.get('account');


    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var that = this;
      var ajax = new XMLHttpRequest();
      ajax.onload = function() {
        var gridmanagerEnable = false;
        var doc = this.responseXML;
        var html = Core9.xmlToString(that.responseXML);
        if(gridmanagerEnable){
          doc.getElementsByTagName("body")[0].innerHTML = '<div id="gm-canvas" class="ui-sortable">' + html + '</div>';
        }else{
          doc.getElementsByTagName("body")[0].innerHTML =  html;
        }
        doc.body.style.opacity = 0;
        var docString = Core9.xmlToString(doc);
        Core9.panel.open('panel-iframe-site');
        var iframe = Core9.panel.getIframeById('panel-iframe-site');
        Core9.iframe.write(iframe, docString, "pagemode"); // false is no gridmanager
        if(gridmanagerEnable){
          setTimeout(function() {
            var cmd = 'window.gm = jQuery("#gm-canvas").gridmanager().data("gridmanager");$(".gm-preview").trigger("click");';
            Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
          }, 1000); // smarter needs to be handled in sendMessage to iframe
        }
        initPanelIframeSite = false;
      }
      ajax.open("GET", '/dashboard/data/accounts/' + account + '/themes/bower_components/' + theme + '/templates/pages/header.html');
      ajax.responseType = "document";
      ajax.send();
    }
    xhr.open("GET", template);
    xhr.responseType = "document";
    xhr.send();
  },
  '/pages$/': function(req) {
    Core9.panel.open('panel-pages');
    Core9.iframe.parent.sentMessageToIframe('init();', Core9.panel.getIframeById('panel-pages'));
  },
  '/page/editor$/': function() {
    Core9.panel.open('panel-iframe-site');
    if (initPanelIframeSite) {
      var iframe = Core9.panel.getIframeById('panel-iframe-site');
      var cmd = 'window.gm = jQuery("#mycanvas").gridmanager().data("gridmanager");';
      Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
      initPanelIframeSite = false;
    }
  }
}
Router.addRoutes(pageRoutes);
