

var themeRoutes = {
  '/theme/edit$/': function() {
    var template = store.get('template');
    var theme = store.get('theme');
    var account = store.get('account');
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var that = this;
      var ajax = new XMLHttpRequest();
      ajax.onload = function() {
        var doc = this.responseXML;
        var html = Core9.xmlToString(that.responseXML);
        doc.getElementsByTagName("body")[0].innerHTML = '<div id="gm-canvas" class="ui-sortable">' + html + '</div>';
        var docString = Core9.xmlToString(doc);
        Core9.panel.open('panel-iframe-site');
        var iframe = Core9.panel.getIframeById('panel-iframe-site');
        Core9.iframe.write(iframe, docString, true);
        setTimeout(function() {
          var cmd = 'window.gm = jQuery("#gm-canvas").gridmanager().data("gridmanager");$(".gm-preview").trigger("click");';
          Core9.iframe.parent.sentMessageToIframe(cmd, iframe);

        }, 1000); // smarter needs to be handled in sendMessage to iframe
        /*
        setTimeout(function(){
          Core9.panel.setPanelWidth();
        }, 2000);
        */
        initPanelIframeSite = false;
      }
      ajax.open("GET", '/dashboard/data/accounts/'+account+'/themes/bower_components/'+theme+'/templates/pages/header.html');
      ajax.responseType = "document";
      ajax.send();
    }
    xhr.open("GET", template);
    xhr.responseType = "document";
    xhr.send();
  },
  '/themes/.*/blocks/.*/add$/': function(req) {
    console.log('add block');
    console.log(window.location);
    var parts = location.pathname.split('/');
    var theme = parts[3];
    var block = parts[5];
    var iframe = Core9.panel.getIframeById('panel-iframe-site');
    var cmd = 'console.log("hi");Core9.blocks.addBlock("'+block+'");';
    Core9.iframe.parent.sentMessageToIframe(cmd, iframe);

  },
  '/templates$/': function() {
    var init = function(modules) {
      var theme = Core9.system.unwrapModule(modules[0]);
      theme.setAccount(store.get('account'));
      var callback = function(data) {
        var themes = data[0].themes;
        if (initPanelThemes) {
          Object.keys(themes).forEach(function(key) {
            var insert = {
              "action": "addItems",
              "findmenusbytitle": "Themes",
              "addItems": [themes[key].data.menu]
            }
            // this is where the theme blocks get added to the menu
            Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
          });
          Core9.iframe.parent.sentMessageToIframe('initNestable([],' + JSON.stringify(themes) + ');', Core9.panel.getIframeById('panel-themes'));
          initPanelThemes = false;
        }
      }
      // for now no blocks in the menu
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
