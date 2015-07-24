var sentJsToTemplate = function(data, iframe) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    //console.log(this.responseText);
    var script = "var data = " + JSON.stringify(data) + ";";
    script = script + this.responseText;
    //console.log(script);
    Core9.iframe.parent.sentMessageToIframe(script, iframe);
  }
  xhr.open("GET", "/dashboard/app/elements/core9-core/js/core-blocks.js");
  xhr.responseType = "text";
  xhr.send();
}


var themeRoutes = {
  '/theme/edit$/': function() {
    var template = store.get('template');
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {

      var that = this;

      var ajax = new XMLHttpRequest();
      ajax.onload = function() {

        //console.log('header :');
        //console.log(this.responseXML);

        var doc = this.responseXML;

        var html = Core9.xmlToString(that.responseXML);

        //console.log('html :');
        //console.log(html);

        doc.getElementsByTagName("body")[0].innerHTML = '<div id="gm-canvas" class="ui-sortable">' + html + '</div>';

        var docString = Core9.xmlToString(doc);

        Core9.panel.open('panel-iframe-site');
        var iframe = Core9.panel.getIframeById('panel-iframe-site');
        Core9.iframe.write(iframe, docString, true);
        var cmd = 'window.gm = jQuery("#gm-canvas").gridmanager().data("gridmanager");$(".gm-preview").trigger("click");';
        setTimeout(function() {
          Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
          var data = {
            "template": template
          }
          sentJsToTemplate(data, iframe);
        }, 2000); // smarter needs to be handled in sendMessage to iframe
        initPanelIframeSite = false;




      }
      ajax.open("GET", template.replace('index.html','header.html'));
      ajax.responseType = "document";
      ajax.send();






    }
    xhr.open("GET", template);
    xhr.responseType = "document";
    xhr.send();
  },
  '/themes/.*/blocks/.*/add$/': function(req) {
    //console.log('add block');
    //console.log(window.location);
  },
  '/themes$/': function() {
    var init = function(modules) {
      var theme = Core9.system.unwrapModule(modules[0]);
      theme.setAccount(store.get('account'));
      //console.log(theme);
      var callback = function(data) {
        var themes = data[0].themes;
        if (initPanelThemes) {
          Object.keys(themes).forEach(function(key) {
            var insert = {
              "action": "addItems",
              "findmenusbytitle": "Themes",
              "addItems": [themes[key].data.menu]
            }
            Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
          });
          Core9.iframe.parent.sentMessageToIframe('initNestable([],' + JSON.stringify(themes) + ');', Core9.panel.getIframeById('panel-themes'));
          initPanelThemes = false;
        }
      }
      theme.get(callback);
      Core9.panel.open('panel-themes');
    }
    Core9.system.multiImport(['app/elements/core9-core/js/core-theme'])
      .then(function(modules) {
        init(modules);
      });
  }
}
Router.addRoutes(themeRoutes);
