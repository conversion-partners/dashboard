var themeRoutes = {
  '/theme/edit$/': function() {
    console.log('edit page');
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
  '/themes/.*/blocks/.*/add$': function(req) {
    console.log('add block');
    console.log(window.location);
    var parts = location.pathname.split('/');
    var theme = parts[3];
    var block = parts[5];
    var iframe = Core9.panel.getIframeById('panel-iframe-site');
    var cmd = 'Core9.blocks.addBlock("' + block + '");';
    Core9.iframe.parent.sentMessageToIframe(cmd, iframe);
  },
  '/themes$': function(req) {
    console.log('themes');
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
              Core9.iframe.parent.sentMessageToIframe(insert, document.getElementsByClassName('menu')[1]);
            });
            initPanelThemes = false;
          }
        }
        // for now no blocks in the menu
      theme.get(callback);
    }
    Core9.system.multiImport(['app/elements/core9-core/js/core-theme'])
      .then(function(modules) {
        init(modules);
      });
  },
  '/templates$/': function() {
    Core9.panel.open('panel-themes');
    Core9.iframe.parent.sentMessageToIframe('init();', Core9.panel.getIframeById('panel-themes'));
  }
}
Router.addRoutes(themeRoutes);
